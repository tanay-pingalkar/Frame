//import
import { farmeInfo, getFrameInfo, ids_input } from "../utils/input";
import { addFr, getFramesRes, likeRes } from "../utils/response";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Frame } from "../entities/frame";
import { Users } from "../entities/users";
import { create_UUID } from "../utils/uuid";
import { write } from "../utils/imageWrite";
import { Like } from "../entities/likes";

//resolver
@Resolver()
export class Frames {
  @Mutation(() => addFr)
  async addFrame(@Arg("frameInfo") frameInfoo: farmeInfo): Promise<addFr> {
    // some global declaration
    const file = await frameInfoo.file;
    const img_uuid = create_UUID();

    // checks for if frameInfo title length is less than 3
    if (frameInfoo.title.length <= 2) {
      return {
        msg: "frame title must be greater than 3",
      };
    }
    let frame: Frame;
    try {
      // check for jf the user with given id exists if not then it will return "user not exists"
      const user = await Users.findOne(frameInfoo.id, {
        relations: ["frames"],
      });
      if (!user) {
        return {
          msg: "user not exist",
        };
      }

      // then it will try to save image
      const lol = await write(file, img_uuid);
      if (!lol) {
        return {
          msg: "cannot save image",
        };
      }

      // and now and will save frame one to many relation to user
      frame = await Frame.create({
        title: frameInfoo.title,
        frame: `http://localhost:4000/${img_uuid + file.filename}`,
        description: frameInfoo.description,
      });
      user.frames.unshift(frame);
      await frame.save();
      await user.save();
      frame = await Frame.findOne(frame.id, { relations: ["user"] });
    } catch (err) {
      // if any thing goes wrong it will return "an unusual error"
      return {
        msg: " an unusual erorr has occure",
      };
    }

    // f every thing goes well , it will return msg success message and frame...
    return {
      msg: "success",
      frame: frame,
    };
  }

  @Query(() => [getFramesRes])
  async getFrames(@Arg("info") info: getFrameInfo): Promise<getFramesRes[]> {
    try {
      let framess: Frame[] = [];
      if (info.lastFrameId === 0) {
        framess = await Frame.createQueryBuilder()
          .leftJoinAndSelect("Frame.user", "users")
          .leftJoinAndSelect("Frame.likes", "Like")
          .limit(8)
          .orderBy("Frame.id", "DESC")
          .getMany();
      } else {
        framess = await Frame.createQueryBuilder()
          .leftJoinAndSelect("Frame.user", "users")
          .leftJoinAndSelect("Frame.likes", "Like")
          .limit(8)
          .orderBy("Frame.id", "DESC")
          .where("Frame.id < :lastId", { lastId: info.lastFrameId })
          .getMany();
      }

      console.log(framess[0].likes);
      const res: getFramesRes[] = [];
      for (let frame of framess) {
        const likeMan = await Like.createQueryBuilder()
          .where("Like.giverId = :giverId", { giverId: info.UserId })
          .andWhere("Like.takerId = :takerId", { takerId: frame.id })
          .select("*")
          .execute();
        let lineNumber: number = 0;
        if (frame.likes) lineNumber = frame.likes.length;
        res.push({
          frame: frame,
          isLiked: likeMan.length != [],
          likeNumber: lineNumber,
        });
      }
      return res;
    } catch (err) {
      console.log(err);
      return [
        {
          errorMsg: "sorry something is wrong",
        },
      ];
    }
  }

  @Mutation(() => likeRes)
  async like(@Arg("ids") ids: ids_input): Promise<likeRes> {
    const { postId, userId } = ids;
    try {
      const post = await Frame.findOne(postId, { relations: ["likes"] });
      const user = await Users.findOne(userId, { relations: ["likes"] });
      const likeMan = await Like.createQueryBuilder()
        .where("Like.giverId = :giverId", { giverId: userId })
        .andWhere("Like.takerId = :takerId", { takerId: postId })
        .select("*")
        .execute();
      if (likeMan.length != 0) {
        try {
          Like.delete(likeMan[0].id);
        } catch (err) {
          console.log(err);
          return {
            like: false,
            errorMsg: "problem in dislike",
          };
        }
        return {
          like: false,
          errorMsg: "disliked",
        };
      }
      if (!post || !user) {
        return {
          like: false,
          errorMsg: "this post or user wont exist",
        };
      }

      const like = Like.create();
      user.likes.unshift(like);
      post.likes.unshift(like);
      await like.save();
      await user.save();
      await post.save();
    } catch (err) {
      console.log(err);
      return {
        like: false,
        errorMsg: "un usual error",
      };
    }
    return {
      like: true,
    };
  }
}

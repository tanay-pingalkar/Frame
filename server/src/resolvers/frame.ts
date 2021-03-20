//import
import { farmeInfo } from "../utils/input";
import { addFr } from "../utils/response";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Frame } from "../entities/frame";
import { Users } from "../entities/users";
import { create_UUID } from "../utils/uuid";
import { write } from "src/utils/imageWrite";

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

    // if every thing goes well , it will return msg success message and frame...
    return {
      msg: "success",
      frame: frame,
    };
  }

  @Query(() => [Frame])
  async getFrames(@Arg("offset") offset: number): Promise<Frame[]> {
    const framess: Frame[] = await Frame.createQueryBuilder()
      .limit(8)
      .offset(offset * 8)
      .orderBy("Frame.id", "DESC")
      .leftJoinAndSelect("Frame.user", "users")
      .getMany();
    return framess;
  }
}

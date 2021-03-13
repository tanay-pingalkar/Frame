//import
import { farmeInfo } from "../utils/input";
import { addFr } from "../utils/response";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Frame } from "../entities/frame";
import { Users } from "../entities/users";
import { createWriteStream } from "fs";
import { create_UUID } from "../utils/uuid";

//resolver
@Resolver()
export class Frames {
  @Mutation(() => addFr)
  async addFrame(@Arg("frameInfo") frameInfoo: farmeInfo): Promise<addFr> {
    console.log(frameInfoo.file);
    const file = await frameInfoo.file;
    const readStream = file.createReadStream();
    const img_uuid = create_UUID();
    const write = async (): Promise<Boolean> => {
      try {
        await readStream
          .pipe(
            createWriteStream(
              __dirname + `/../../images/${img_uuid + file.filename}`
            )
          )
          .on("finish", () => console.log("saved"))
          .on("error", () => console.log("oops"));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    if (frameInfoo.title.length <= 2) {
      return {
        msg: "frame title must be greater than 3",
      };
    }
    let frame: Frame;
    try {
      const user = await Users.findOne(frameInfoo.id, {
        relations: ["frames"],
      });
      if (!user) {
        return {
          msg: "user not exist",
        };
      }
      const lol = await write();
      if (!lol) {
        return {
          msg: "cannot save image",
        };
      }
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
      return {
        msg: " an unusual erorr has occure",
      };
    }
    return {
      msg: "success",
      frame: frame,
    };
  }

  @Query(() => [Frame])
  async getFrames(): Promise<Frame[]> {
    const framess: Frame[] = await Frame.createQueryBuilder()
      .leftJoinAndSelect("Frame.user", "users")
      .getMany();
    console.log(framess);
    return framess;
  }
}

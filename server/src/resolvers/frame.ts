//import
import { farmeInfo } from "../utils/input";
import { addFr } from "../utils/response";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Frame } from "../entities/frame";
import { Users } from "../entities/users";

//resolver
@Resolver()
export class Frames {
  @Mutation(() => addFr)
  async addFrame(@Arg("frameInfo") frameInfoo: farmeInfo): Promise<addFr> {
    console.log(frameInfoo);
    if (frameInfoo.title.length <= 2) {
      return {
        msg: "frame title must be greater than 3",
      };
    }
    let frame: Frame;
    try {
      frame = await Frame.create({ title: frameInfoo.title }).save();
      const user = await Users.findOne(frameInfoo.id, {
        relations: ["frames"],
      });
      user.frames.unshift(frame);
      await user.save();
      frame = await Frame.findOne(frame.id, { relations: ["user"] });
    } catch (err) {
      console.log(err);
      return {
        msg: " an unusual error has occure",
      };
    }
    return {
      msg: "success",
      frame: frame,
    };
  }
}

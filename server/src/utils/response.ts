/* eslint-disable @typescript-eslint/ban-types*/

import { Users } from "../entities/users";
import { ObjectType, Field } from "type-graphql";
import { Frame } from "../entities/frame";

@ObjectType()
export class tokenResponse {
  @Field(() => String, { nullable: true })
  ErrorMsg?: String;

  @Field(() => String, { nullable: true })
  token?: String;
}

@ObjectType()
export class userResponse {
  @Field(() => String, { nullable: true })
  ErrorMsg?: String;

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@ObjectType()
export class addFr {
  @Field(() => String)
  msg: string;

  @Field(() => Frame, { nullable: true })
  frame?: Frame;
}

@ObjectType()
export class likeRes {
  @Field(() => Boolean)
  like: boolean;

  @Field(() => String, { nullable: true })
  errorMsg?: String;
}

@ObjectType()
export class getFramesRes {
  @Field(() => Frame, { nullable: true })
  frame?: Frame;

  @Field(() => Boolean, { nullable: true })
  isLiked?: boolean;

  @Field(() => Number, { nullable: true })
  likeNumber?: number;

  @Field(() => String, { nullable: true })
  errorMsg?: String;
}

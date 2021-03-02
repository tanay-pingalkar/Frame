import { Users } from "../entities/users";
import { ObjectType, Field } from "type-graphql";

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

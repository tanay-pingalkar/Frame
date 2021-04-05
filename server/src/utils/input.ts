import { GraphQLUpload } from "apollo-server";
import { InputType, Field } from "type-graphql";
import { Upload } from "./types";

@InputType()
export class input {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class loginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class farmeInfo {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => GraphQLUpload)
  file: Upload;

  @Field(() => String)
  description: string;
}

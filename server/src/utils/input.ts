import { InputType, Field } from "type-graphql";

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
  nameOrEmail: string;

  @Field(() => String)
  password: string;
}

import { Frames } from "../resolvers/frame";
import { hello } from "../resolvers/hello";
import { User } from "../resolvers/user";
import { buildSchema } from "type-graphql";

export const createSchema = async () =>
  await buildSchema({
    resolvers: [hello, User, Frames],
  });

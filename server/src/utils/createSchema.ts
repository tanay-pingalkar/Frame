import { Frames } from "../resolvers/frame";
import { hello } from "../resolvers/hello";
import { User } from "../resolvers/user";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

export const createSchema = async (): Promise<GraphQLSchema> =>
  await buildSchema({
    resolvers: [hello, User, Frames],
  });

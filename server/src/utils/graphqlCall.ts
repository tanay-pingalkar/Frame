import { graphql } from "graphql";
import "reflect-metadata";
import { createSchema } from "./createSchema";

export const graphqlCall = async (query: any, variables?: any) => {
  const schema = await createSchema();
  return await graphql(schema, query, undefined, undefined, variables);
};

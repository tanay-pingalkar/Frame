import { graphql } from "graphql";
import "reflect-metadata";
import { createSchema } from "./createSchema";

export const graphqlCall = async (query: any, variables?: any) => {
  const schema = await createSchema();
  return graphql(schema, query, undefined, undefined, variables);
};

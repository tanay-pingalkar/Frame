import { graphql, Source } from "graphql";
import "reflect-metadata";
import { createSchema } from "./createSchema";

export const graphqlCall = async (
  query: Source,
  variables?: Record<string, unknown>
): Promise<unknown> => {
  const schema = await createSchema();
  return graphql(schema, query, undefined, undefined, variables);
};

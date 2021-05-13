import { graphql } from "graphql";
import "reflect-metadata";
import { createSchema } from "./createSchema";

export const graphqlCall = async (
  query: string,
  variables?: Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const schema = await createSchema();
  return graphql(schema, query, undefined, undefined, variables);
};

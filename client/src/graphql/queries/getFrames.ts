import { gql } from "graphql-request";

export const GET_FRAMES = gql`
  query getFrames($offset: Float!) {
    getFrames(offset: $offset) {
      title
      frame
      description
      user {
        name
      }
    }
  }
`;

import { gql } from "graphql-request";

export const GET_FRAMES = gql`
  {
    getFrames {
      title
      user {
        name
      }
    }
  }
`;

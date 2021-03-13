import { gql } from "graphql-request";

export const ADD_FRAME = gql`
  mutation addFrame(
    $id: Float!
    $title: String!
    $file: Upload!
    $description: String!
  ) {
    addFrame(
      frameInfo: {
        id: $id
        title: $title
        file: $file
        description: $description
      }
    ) {
      msg
    }
  }
`;

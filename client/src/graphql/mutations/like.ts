import { gql } from "graphql-request";

export const LIKE = gql`
  mutation like($postId: Int!, $userId: Int!) {
    like(ids: { postId: $postId, userId: $userId }) {
      errorMsg
      like
    }
  }
`;

import { gql } from "graphql-request";

export const GET_FRAMES = gql`
  query getFrames($userId: Float!, $lastFrameId: Float!) {
    getFrames(info: { UserId: $userId, lastFrameId: $lastFrameId }) {
      likeNumber
      isLiked
      frame {
        title
        frame
        description
        user {
          name
        }
      }
    }
  }
`;

import { gql } from "graphql-request";

export const GOOGLE_AUTH = gql`
  mutation($token: String!) {
    googleAuth(token: $token) {
      user {
        id
        name
        email
      }
      ErrorMsg
    }
  }
`;

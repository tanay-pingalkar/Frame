import { gql } from "graphql-request";

export const AUTH = gql`
  query auth($token: String!) {
    auth(token: $token) {
      ErrorMsg
      user {
        id
        name
        email
      }
    }
  }
`;

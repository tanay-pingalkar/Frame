import { gql } from "graphql-request";

export const GOOGLE_AUTH = gql`
  mutation($token: String!) {
    googleLogin(token: $token) {
      token
      ErrorMsg
    }
  }
`;

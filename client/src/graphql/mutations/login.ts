import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(userInfo: { email: $email, password: $password }) {
      ErrorMsg
      token
    }
  }
`;

import { gql } from "graphql-request";

export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(userInfo: { name: $name, password: $password, email: $email }) {
      ErrorMsg
      token
    }
  }
`;

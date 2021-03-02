import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation login($nameOrEmail: String!, $password: String!) {
    login(userInfo: { nameOrEmail: $nameOrEmail, password: $password }) {
      ErrorMsg
      token
    }
  }
`;

import { Users } from "../../src/entities/users";
import { Connection } from "typeorm";
import { createTestCon } from "../../src/utils/createCon";
import { graphqlCall } from "../../src/utils/graphqlCall";

const registerMutation = `
mutation Register($name:String!,$email:String!,$password:String!){
  register(userInfo:{name:$name,password:$password,email:$email}){
    ErrorMsg
    token
  }
}
`;

const authMutation = `
query Auth($token:String!){
  auth(token:$token){
    ErrorMsg
    user {
      name
      email
    }
  }
}
`;

const loginMutation = `
mutation Login($email:String!,$password:String!){
  login(userInfo: { email:$email, password:$password}) {
    ErrorMsg
    token
  }
}
`;

let con: Connection;

beforeAll(async (done) => {
  con = await createTestCon();
  done();
});
afterAll(async (done) => {
  con.close();
  done();
});

describe("user resolver test", () => {
  let token: string;
  const user = {
    name: "tanay",
    email: "azs@gmail.com",
    password: "lolol",
  };
  it("should register user", async () => {
    const { data } = await graphqlCall(registerMutation, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    token = data.register.token;
    expect(data.register.ErrorMsg).toBeNull();
    expect(typeof data.register.token).toBe("string");
    const { name, email } = await Users.findOne({ email: user.email });
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
  });
  it("should return user", async () => {
    const { data } = await graphqlCall(authMutation, {
      token: token,
    });
    expect(data.auth).toEqual({
      ErrorMsg: null,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });

  it("should login user", async () => {
    const { data } = await graphqlCall(loginMutation, {
      email: user.email,
      password: user.password,
    });
    expect(data.login.ErrorMsg).toBeNull();
    expect(typeof data.login.token).toBe("string");
    const { data: authData } = await graphqlCall(authMutation, {
      token: data.login.token,
    });
    expect(authData.auth).toEqual({
      ErrorMsg: null,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });
});

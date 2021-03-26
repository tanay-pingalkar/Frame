//import
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Users } from "../entities/users";
import argon2 from "argon2";
import { input, loginInput } from "../utils/input";
import { tokenResponse, userResponse } from "../utils/response";
import { ValidateEmail } from "../utils/validateEmail";
import { jwtgen } from "../utils/jwt";
import jwt from "jsonwebtoken";

//resolver
@Resolver()
export class User {
  @Query(() => [Users])
  users() {
    return Users.find();
  }

  @Mutation(() => tokenResponse)
  async register(@Arg("userInfo") userInfo: input): Promise<tokenResponse> {
    if (userInfo.name.length <= 3 || userInfo.password.length <= 3) {
      return {
        ErrorMsg: "name or email or password must be greater than 3",
      };
    }
    if (!ValidateEmail(userInfo.email)) {
      return {
        ErrorMsg: "please give a valid email",
      };
    }
    try {
      userInfo.password = await argon2.hash(userInfo.password);
      const user = await Users.create(userInfo).save();
      console.log(user);
      const token = jwtgen(user.id);
      return {
        token: token,
      };
    } catch (err) {
      console.log(err);
      return {
        ErrorMsg: "user already exist",
      };
    }
  }

  @Mutation(() => tokenResponse)
  async login(@Arg("userInfo") userInfo: loginInput): Promise<tokenResponse> {
    let user: Users;

    /* if given string is email then it will find user in database for email 
    or it will find using name, validateEmail is a regex function in utils */
    if (ValidateEmail(userInfo.nameOrEmail)) {
      user = await Users.findOne({ email: userInfo.nameOrEmail });
    } else {
      user = await Users.findOne({ name: userInfo.nameOrEmail });
    }
    if (!user) {
      return {
        ErrorMsg: "user does not exist",
      };
    }

    /* checkfor if the user password matches the hashed password 
    stored in database and if it maches, then it will return a jwt-token */
    const isValidate = await argon2.verify(user.password, userInfo.password);
    if (isValidate) {
      const token = jwtgen(user.id);
      return {
        token: token,
      };
    } else {
      return {
        ErrorMsg: "password is wrong",
      };
    }
  }

  @Query(() => userResponse)
  async auth(@Arg("token") token: string): Promise<userResponse> {
    let verified: any;
    try {
      verified = jwt.verify(token, "thisIsSecret");
    } catch (err) {
      return {
        ErrorMsg: "token not valid",
      };
    }
    const user = await Users.findOne(verified.user!);
    return {
      user: user,
    };
  }
}

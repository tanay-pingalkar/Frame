//import
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Users } from "../entities/users";
import argon2 from "argon2";
import { input, loginInput } from "../utils/input";
import { tokenResponse, userResponse } from "../utils/response";
import { ValidateEmail } from "../utils/validateEmail";
import { jwtgen } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../../.env" });
const client = new OAuth2Client(process.env.REACT_APP_SECRET);

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
    user = await Users.findOne({ email: userInfo.email });
    if (!user) {
      return {
        ErrorMsg: "user does not exist",
      };
    }

    /* checkfor if the user password matches the hashed password 
    stored in database and if it maches, then it will return a jwt-token */
    if (user.password === "google") {
      return {
        ErrorMsg: "this accout can be only logged in using google",
      };
    }
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
  @Mutation(() => userResponse)
  async googleAuth(@Arg("token") token: string): Promise<userResponse> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_SECRET,
    });
    console.log(ticket.getPayload());
    const { name, email } = ticket.getPayload();
    const user = await Users.findOne({ email: email });
    console.log(user);
    if (user) {
      if (user.password != "google") {
        return {
          ErrorMsg: "you need to login to this accout manually",
        };
      } else {
        return {
          user: user,
        };
      }
    }

    let new_user: Users;
    try {
      new_user = Users.create({
        email: email,
        name: name,
        password: "google",
      });
      await new_user.save();
    } catch (er) {
      console.log(er);
    }

    console.log(new_user, "lol");
    return {
      user: new_user,
    };
  }
}

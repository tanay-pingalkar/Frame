import React, { useState } from "react";
import { client } from "../graphql/client";
import { LOGIN } from "../graphql/mutations/login";
import { replace } from "../utils/replaceSpace";
import LoginWrapper from "../components/loginWrapper";
import "../styles/login.scss";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { tokenData } from "../utils/types";
import GoogleLogin from "react-google-login";
import Google from "../svg/google";
import dotenv from "dotenv";
import { GOOGLE_AUTH } from "../graphql/mutations/googleAuth";
dotenv.config();

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [redirect, setredirect] = useState(<span></span>);

  const handleGoogle = async (googleData: any) => {
    console.log(googleData);
    // store returned user somehow
    let token: tokenData = {};
    try {
      token = await client.request<tokenData>(GOOGLE_AUTH, {
        token: googleData.tokenId,
      });
      console.log(token);
      if (token.googleAuth!.ErrorMsg)
        seterror("*" + token.googleAuth!.ErrorMsg);
    } catch (error) {
      console.log(error);
    }
    console.log(token);
    if (token.googleAuth!.user) {
      localStorage.setItem("TOKEN_GOOGLE", googleData.tokenId);
      setredirect(<Redirect to="/"></Redirect>);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let token: tokenData = {};
    try {
      token = await client.request<tokenData>(LOGIN, {
        email: email,
        password: password,
      });
      if (token.login!.ErrorMsg) seterror("*" + token.login!.ErrorMsg);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (token.login!.token) {
      localStorage.setItem("TOKEN", token.login!.token);
      setredirect(<Redirect to="/"></Redirect>);
    }
  };
  return (
    <LoginWrapper>
      {redirect}
      <form onSubmit={(e) => handleSubmit(e)}>
        <p className="error">{error}</p>
        <input
          placeholder="email"
          onChange={(e) => replace(e, setemail)}
          value={email}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        ></input>
        <button type="submit" className="normal">
          {isLoading ? (
            <ReactLoading
              type={"bars"}
              color={"black"}
              height={"18px"}
              width={"20px"}
              className="loader"
            />
          ) : (
            <span>Login</span>
          )}
        </button>
        <GoogleLogin
          clientId={process.env.REACT_APP_SECRET!}
          onSuccess={handleGoogle}
          onFailure={handleGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className="google">
              <Google></Google>
              <span>Login with google</span>
            </button>
          )}
        />
        <p>
          if you dont have account? <a href="/register">Register</a> please
        </p>
      </form>
    </LoginWrapper>
  );
};

export default Login;

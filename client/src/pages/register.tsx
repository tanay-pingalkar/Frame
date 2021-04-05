import React, { useState } from "react";
import { replace } from "../utils/replaceSpace";
import LoginWrapper from "../components/loginWrapper";
import "../styles/login.scss";
import ReactLoading from "react-loading";
import { client } from "../graphql/client";
import { REGISTER } from "../graphql/mutations/register";
import { Redirect } from "react-router-dom";
import { tokenData } from "../utils/types";
import GoogleLogin from "react-google-login";
import Google from "../svg/google";
import { handleGoogle } from "../utils/googleLogin";
require("dotenv").config();

const Register = () => {
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [redirect, setredirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let token: tokenData = {};
    try {
      token = await client.request<tokenData>(REGISTER, {
        name: name,
        email: email,
        password: password,
      });
      if (token.register!.ErrorMsg) seterror("*" + token.register!.ErrorMsg);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (token.register!.token) {
      localStorage.setItem("TOKEN", token.register!.token);
      setredirect(true);
    }
  };
  return (
    <LoginWrapper>
      {redirect ? <Redirect to="/app/frames"></Redirect> : <></>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <p className="error">{error}</p>
        <input
          placeholder="name"
          onChange={(e) => replace(e, setName)}
          value={name}
        ></input>
        <input
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
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
            <span>Register</span>
          )}
        </button>
        <GoogleLogin
          clientId={process.env.REACT_APP_SECRET!}
          onSuccess={(data) => handleGoogle(data, seterror, setredirect)}
          onFailure={() => seterror("* an unusual error in google is there")}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className="google">
              <Google></Google>
              <span>Login with google</span>
            </button>
          )}
        />
        <p>
          if you already have account? <a href="/login">Log in</a> please
        </p>
      </form>
    </LoginWrapper>
  );
};

export default Register;

import React, { useState } from "react";
import { client } from "../graphql/client";
import { LOGIN } from "../graphql/mutations/login";
import { replace } from "../utils/replaceSpace";
import LoginWrapper from "../components/loginWrapper";
import "../styles/login.scss";
import ReactLoading from "react-loading";
import { Link, useHistory } from "react-router-dom";
import { tokenData } from "../utils/types";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import Google from "../svg/google";
import dotenv from "dotenv";
import { handleGoogle } from "../utils/googleLogin";
import { useDispatch } from "react-redux";
dotenv.config();

const Login = (): JSX.Element => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let token: tokenData = {};
    try {
      token = await client.request<tokenData>(LOGIN, {
        email: email,
        password: password,
      });
      if (token.login?.ErrorMsg) seterror("*" + token.login.ErrorMsg);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (token.login?.token) {
      localStorage.setItem("TOKEN", token.login.token);
      dispatch({ type: "logging" });
      history.push("/app/home");
    }
  };
  return (
    <LoginWrapper>
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
          clientId={process.env.REACT_APP_SECRET as string}
          onSuccess={(data) => {
            const isOk = handleGoogle(data as GoogleLoginResponse, seterror);
            if (isOk) {
              history.push("/app/home");
            }
          }}
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
          if you dont have account? <Link to="/register">Register</Link> please!
        </p>
      </form>
    </LoginWrapper>
  );
};

export default Login;

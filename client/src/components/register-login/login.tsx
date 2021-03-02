import React, { useState } from "react";
import { client } from "../../graphql/client";
import { LOGIN } from "../../graphql/mutations/login";
import { replace } from "../../utils/replaceSpace";
import LoginWrapper from "./loginWrapper/loginWrapper";
import "./style.scss";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { tokenData } from "../../utils/types";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [redirect, setredirect] = useState(<span></span>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let token: tokenData = {};
    try {
      token = await client.request<tokenData>(LOGIN, {
        nameOrEmail: name,
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
          placeholder="name or email"
          onChange={(e) => replace(e, setName)}
          value={name}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        ></input>
        <button type="submit">
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

        <p>
          if you dont have account? <a href="/register">Register</a> please
        </p>
      </form>
    </LoginWrapper>
  );
};

export default Login;

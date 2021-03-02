import React, { useEffect, useState } from "react";
import { AUTH } from "../../graphql/queries/auth";
import { client } from "../../graphql/client";
import { authData } from "../../utils/types";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const [isAuth, setauth] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (token) {
      client
        .request<authData>(AUTH, { token: token })
        .then((val) => {
          setauth(true);
          setName(val.auth!.user.name!);
          console.log(val);
        });
    } else setauth(false);
  }, [token]);

  return (
    <div>
      <button
        onClick={() => {
          localStorage.clear();
          setToken(localStorage.getItem("TOKEN"));
        }}
      >
        Logout
      </button>
      {isAuth ? <h1>{name}</h1> : <h1>login please</h1>}
    </div>
  );
};

export default App;

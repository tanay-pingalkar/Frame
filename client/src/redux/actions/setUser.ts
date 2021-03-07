import { Dispatch } from "redux";
import { client } from "../../graphql/client";
import { AUTH } from "../../graphql/queries/auth";
import { authData, userAction } from "../../utils/types";

export const setAuth = async (dispatch: Dispatch) => {
  const token = await localStorage.getItem("TOKEN");
  if (!token) {
    dispatch<userAction>({ type: "nope" });
    return;
  }
  const response: authData = await client.request(AUTH, { token: token });
  if (response.auth?.ErrorMsg === null) {
    dispatch<userAction>({ type: "auth", payload: response.auth.user });
  } else {
    console.log(response.auth?.ErrorMsg);
    dispatch<userAction>({ type: "nope" });
  }
};

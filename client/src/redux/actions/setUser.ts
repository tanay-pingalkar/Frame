import { Dispatch } from "redux";
import { client } from "../../graphql/client";
import { GOOGLE_AUTH } from "../../graphql/mutations/googleAuth";
import { AUTH } from "../../graphql/queries/auth";
import { authData, userAction } from "../../utils/types";

export const setAuth = async (dispatch: Dispatch) => {
  const token = localStorage.getItem("TOKEN");
  const google_token = localStorage.getItem("TOKEN_GOOGLE");
  if (google_token) {
    const response = await client.request(GOOGLE_AUTH, { token: google_token });
    console.log("lol");
    if (response.googleAuth?.ErrorMsg === null) {
      dispatch<userAction>({ type: "auth", payload: response.googleAuth.user });
    } else {
      dispatch<userAction>({ type: "nope" });
    }
    return;
  }
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

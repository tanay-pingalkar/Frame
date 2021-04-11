import { client } from "../graphql/client";
import { GOOGLE_AUTH } from "../graphql/mutations/googleAuth";
import { setStateString, tokenData } from "./types";

export const handleGoogle = async (
  googleData: any,
  seterror: setStateString
): Promise<boolean> => {
  // store returned user somehow
  let token: tokenData = {};
  try {
    token = await client.request<tokenData>(GOOGLE_AUTH, {
      token: googleData.tokenId,
    });
    console.log(token);
    if (token.googleLogin!.ErrorMsg) {
      seterror("*" + token.googleLogin!.ErrorMsg);
      return false;
    } else if (token.googleLogin!.token) {
      localStorage.setItem("TOKEN", token.googleLogin!.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
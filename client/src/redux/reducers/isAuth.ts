import { isAuth as isAuthType, userAction } from "../../utils/types";

const isAuth = (state: isAuthType = "logging", action: userAction): string => {
  switch (action.type) {
    case "auth":
      return "logged";
    case "nope":
      return "nolog";
    case "logging":
      return "logging";
    default:
      return state;
  }
};
export default isAuth;

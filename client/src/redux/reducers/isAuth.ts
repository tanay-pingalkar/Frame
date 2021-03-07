import { userAction } from "../../utils/types";

const isAuth = (state: boolean = false, action: userAction) => {
  switch (action.type) {
    case "auth":
      return true;
    case "nope":
      return false;
    default:
      return state;
  }
};
export default isAuth;

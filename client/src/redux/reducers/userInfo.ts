import { user, userAction } from "../../utils/types";

const userInfo = (state: user = {}, action: userAction): user => {
  switch (action.type) {
    case "auth":
      return (state = action.payload as user);
    default:
      return state;
  }
};

export default userInfo;

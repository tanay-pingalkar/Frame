import { combineReducers } from "redux";
import isAuth from "./reducers/isAuth";
import userInfo from "./reducers/userInfo";
import where from "./reducers/where";

const allReducer = combineReducers({
  isAuth: isAuth,
  userInfo: userInfo,
  where: where,
});

export default allReducer;

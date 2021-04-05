import { combineReducers } from "redux";
import isAuth from "./reducers/isAuth";
import userInfo from "./reducers/userInfo";

const allReducer = combineReducers({
  isAuth: isAuth,
  userInfo: userInfo,
});

export default allReducer;

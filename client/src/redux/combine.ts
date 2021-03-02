import { combineReducers } from "redux";
import isAuth from "./reducers/isAuth";

const allReducer = combineReducers({
  isAuth: isAuth,
});

export default allReducer;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/actions/setUser";
import "../styles/global.scss";
import dotenv from "dotenv";
import Nav from "../components/nav";
import Frames from "../components/frames";
import Upload from "./upload";
import "../styles/feed.scss";
import { Route, Switch, useHistory } from "react-router";
import { reduxState } from "../utils/types";
dotenv.config();

const App = (): JSX.Element => {
  const isAuth = useSelector((state: reduxState) => state.isAuth);
  const userInfo = useSelector((state: reduxState) => state.userInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth);
  }, []);

  useEffect(() => {
    console.log(isAuth, userInfo);
    if (isAuth === "nolog") history.push("/login");
  }, [isAuth]);

  return (
    <div className="full-box">
      <div className="flex">
        <div className="feed">
          <Switch>
            <Route path="/app/home" component={Frames}></Route>
            <Route path="/app/upload" component={Upload}></Route>
          </Switch>
        </div>
        <Nav></Nav>
      </div>
    </div>
  );
};

export default App;

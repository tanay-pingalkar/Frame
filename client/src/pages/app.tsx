import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/actions/setUser";
import "../styles/global.scss";
import dotenv from "dotenv";
import Nav from "../components/nav";
import Frames from "../components/frames";
import Upload from "./upload";
import "../styles/feed.scss";
import { Route, Switch } from "react-router";
dotenv.config();

const App = () => {
  const isAuth = useSelector((state: any) => state.isAuth);
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth);
  }, [dispatch]);

  console.log(isAuth, userInfo);
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

import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
import logo from "../media/Wallpaper-Malavida-Green-Top-Image.jpg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Add from "../svg/add";

const Nav = () => {
  const auth: boolean = useSelector((state: any) => state.isAuth);
  const history = useHistory();
  return (
    <>
      {!auth ? (
        <p
          className="login"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login please
        </p>
      ) : (
        <div className="nav">
          <img alt="profile" src={logo} className="profile"></img>
          <div className="toggler">
            <Search></Search>
            <h2>Search</h2>
            <br></br>
            <Home></Home>
            <h2>Home</h2>
            <br></br>
            <Bell></Bell>
            <h2>Notification</h2>
          </div>
          <div className="add" onClick={() => history.push("/app/upload")}>
            <Add></Add>
            <h2>Post frame</h2>
          </div>
        </div>
      )}
    </>
  );
};
export default Nav;

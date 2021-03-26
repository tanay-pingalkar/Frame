import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
import logo from "../media/Wallpaper-Malavida-Green-Top-Image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setWhere } from "../redux/actions/setWhere";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const [redirect, setredirect] = useState(<span></span>);
  const auth: boolean = useSelector((state: any) => state.isAuth);
  return (
    <>
      {redirect}
      {!auth ? (
        <p
          className="login"
          onClick={() => {
            setredirect(<Redirect to="/login"></Redirect>);
          }}
        >
          Login please
        </p>
      ) : (
        <div className="nav">
          <img alt="profile" src={logo} className="profile"></img>
          <div className="toggler">
            <Search></Search>
            <Home></Home>
            <Bell></Bell>
          </div>
          <button className="add" onClick={() => dispatch(setWhere("upload"))}>
            +
          </button>
        </div>
      )}
    </>
  );
};
export default Nav;

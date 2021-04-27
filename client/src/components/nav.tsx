import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
import logo from "../media/Wallpaper-Malavida-Green-Top-Image.jpg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Add from "../svg/add";

const Nav = () => {
  const auth: string = useSelector((state: any) => state.isAuth);
  const { name } = useSelector((state: any) => state.userInfo);
  const history = useHistory();
  return (
    <>
      {auth === "loggin" || auth === "nolog" ? (
        <p className="login">{auth}</p>
      ) : (
        <div className="nav">
          <div className="profile">
            <img alt="profile" src={logo}></img>
            <h2>{name}</h2>
          </div>

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

import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
import logo from "../media/Wallpaper-Malavida-Green-Top-Image.jpg";
import { useDispatch } from "react-redux";
import { setWhere } from "../redux/actions/setWhere";

const Nav = () => {
  const dispatch = useDispatch();
  return (
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
  );
};
export default Nav;

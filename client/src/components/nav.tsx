import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
import logo from "../media/Wallpaper-Malavida-Green-Top-Image.jpg";
const Nav = () => {
  return (
    <div className="nav">
      <img alt="profile" src={logo} className="profile"></img>
      <div className="toggler">
        <Search></Search>
        <Home></Home>
        <Bell></Bell>
      </div>
      <div className="add">+</div>
    </div>
  );
};
export default Nav;

import "../styles/nav.scss";
import Bell from "../svg/bell";
import Home from "../svg/home";
import Search from "../svg/search";
const Nav = () => {
  return (
    <div className="nav">
      <div className="toggler">
        <Search></Search>
        <Home></Home>
        <Bell></Bell>
      </div>
    </div>
  );
};
export default Nav;

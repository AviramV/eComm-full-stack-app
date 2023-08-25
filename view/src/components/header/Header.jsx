import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <NavLink className="logo" to="/">
          LOGO
        </NavLink>
        <NavLink className="user" to="/user">
          User
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

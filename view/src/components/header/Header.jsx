import { NavLink } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";

function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header>
      <nav>
        <NavLink className="logo" to="/">
          LOGO
        </NavLink>
        {currentUser ? (
          <NavLink className="user" to="/user">
            {currentUser.username}
          </NavLink>
        ) : (
          <div style={{ display: "flex", gap: "1em" }}>
            <NavLink className="login" to="/login">
              Login
            </NavLink>
            <NavLink className="register" to="/register">
              Register
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

import { NavLink } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";

function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const logOut = async () => {
    const serverURL = import.meta.env.VITE_SERVER_BASE_URL;
    const response = await fetch(`${serverURL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setCurrentUser({});
    console.log("from header: ", await response.text());
  };

  return (
    <header>
      <nav>
        <NavLink className="logo" to="/">
          LOGO
        </NavLink>

        <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
          {currentUser.username ? (
            <>
              <NavLink className="user" to="/user">
                {currentUser.username}
              </NavLink>
              <NavLink to="/">
                <button onClick={logOut}>Log Out</button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="login" to="/login">
                <button>Login</button>
              </NavLink>
              <NavLink className="register" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

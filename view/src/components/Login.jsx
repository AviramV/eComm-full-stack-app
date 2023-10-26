import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFormData, sendFormData } from "../Utils/formUtils";
import { CurrentUserContext } from "../Contexts";

const Login = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = getFormData(form);
    try {
      const response = await sendFormData(location.pathname, formData);
      if (!response.ok) return setMessage("Incorrect username or password");
      const user = await response.json();
      setCurrentUser(user);
      // navigate(-1);
    } catch (error) {
      console.log(error.message);
      setMessage("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
        <p>
          Don't have an account yet?
          <Link to="/register"> Register</Link>
        </p>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </>
  );
};

export default Login;

import { Link, useLocation } from "react-router-dom";
import { getFormData, sendFormData } from "../Utils/formUtils";
import { useState } from "react";

const Register = () => {
  const [message, setMessage] = useState(null);
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = getFormData(form);
    const response = await sendFormData(location.pathname, formData);
    if (!response.ok) {
      const serverMessage = await response.json();
      setMessage(serverMessage.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={() => setMessage(null)}
          autoFocus
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          onChange={() => setMessage(null)}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          onChange={() => setMessage(null)}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </>
  );
};

export default Register;

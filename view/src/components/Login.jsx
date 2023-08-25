import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
    const response = await fetch("http://localhost:4001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formJson,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account yet?
        <Link to="/register"> Register</Link>
      </p>
    </>
  );
};

export default Login;

import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Cart from "./containers/Cart";
import Orders from "./containers/Orders";
import Products from "./containers/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/User" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

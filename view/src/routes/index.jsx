import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login/Login";
import Cart from "../containers/Cart";
import Orders from "../containers/Orders";
import Products from "../containers/Products";
import Product from "../components/Product";
import User from "../components/User";
import ErrorPage from "../ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<ErrorPage />}
      loader={(async) =>
        fetch("http://localhost:4001/login", {
          credentials: "include",
        })
      }
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/User" element={<User />} />
      </Route>
    </Route>
  )
);

export default router;

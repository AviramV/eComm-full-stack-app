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
import Products from "../containers/products/Products";
import Product from "../components/Product";
import User from "../components/User";
import ErrorPage from "../ErrorPage";
import { getProducts } from "./loaders/products";
import { productAction } from "./actions/product";
import { loader as cartLoader } from "./loaders/cart";
import { cartAction } from "./actions/cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<ErrorPage />}
      loader={async () =>
        await fetch("http://localhost:4001/login", {
          credentials: "include",
        })
      }
    >
      <Route errorElement={<ErrorPage />}>
        <Route index loader={getProducts} element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={<Cart />}
          loader={cartLoader}
          action={cartAction}
        />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/products/:productId"
          element={<Product />}
          loader={async ({ params }) =>
            await fetch(`http://127.0.0.1:4001/products/${params.productId}`)
          }
          action={productAction}
        />
        <Route path="/User" element={<User />} />
      </Route>
    </Route>
  )
);

export default router;

import { Link, useLoaderData } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useLoaderData();
  const emptyCart = (
    <h2>
      Nothing here yet. <Link to="/">Shop around!</Link>
    </h2>
  );

  return (
    <>
      <h1>Cart</h1>
      {!cartItems.length ? (
        emptyCart
      ) : (
        <>
          <h2>Total items: {cartItems.length}</h2>
          {cartItems.map((item) => {
            return (
              <li key={item.id} style={{ listStyle: "none" }}>
                <hr />
                <CartItem item={item} />
              </li>
            );
          })}
        </>
      )}
    </>
  );
};

export default Cart;

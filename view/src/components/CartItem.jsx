import { useState } from "react";
import { useFetcher } from "react-router-dom";

const CartItem = ({ item }) => {
  const fetcher = useFetcher();
  const [disableButton, setDisableButton] = useState(true);
  return (
    <>
      <h3>{item.name}</h3>
      <div>Price: ${item.price}</div>
      <fetcher.Form method="PUT" action="/cart">
        <label>
          qty:
          <input
            name="qty"
            type="number"
            defaultValue={item.qty}
            min="0"
            onChange={({ target }) => {
              setDisableButton(target.value == item.qty);
            }}
          ></input>
        </label>
        <button
          disabled={disableButton}
          type="submit"
          name="itemId"
          value={item.id}
        >
          Save
        </button>
      </fetcher.Form>
      <fetcher.Form method="DELETE" action="/cart">
        <button
          disabled={fetcher.state !== "idle"}
          type="submit"
          name="itemId"
          value={item.id}
        >
          Remove form cart
        </button>
      </fetcher.Form>
    </>
  );
};

export default CartItem;

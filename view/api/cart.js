const serverURL = import.meta.env.VITE_SERVER_BASE_URL;
const cartPath = `${serverURL}/cart`;

export const addToCart = (itemId) =>
  fetch(`${cartPath}/${itemId}`, {
    method: "POST",
    credentials: "include",
  });

export const getCart = () => fetch(`${cartPath}`, { credentials: "include" });

export const editItemQuantity = (newQuantity, itemId) =>
  fetch(`${cartPath}/${itemId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty: newQuantity }),
  });

export const deleteItemFromCart = (itemId) =>
  fetch(`${cartPath}/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });

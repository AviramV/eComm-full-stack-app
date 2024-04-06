const serverURL = import.meta.env.VITE_SERVER_BASE_URL;

export const addToCart = (productId) =>
  fetch(`${serverURL}/cart/${productId}`, {
    method: "POST",
    credentials: "include",
  });

const serverURL = import.meta.env.VITE_SERVER_BASE_URL;

export const addToCart = async (productId) => {
  const response = await fetch(`${serverURL}/cart/${productId}`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw Error("Failed to add product to cart");
  }
  return "Product added successfully!";
};

import { addToCart } from "../../../api/cart";

export const productAction = async ({ params }) => {
  const res = await addToCart(params.productId);
  if (!res.ok) {
    const error = await res.json();
    return {
      message: `🔴 Couldn't add to cart. ${error.message}.`,
    };
  }
  return {
    message: "✅ Successfully added to cart!",
  };
};

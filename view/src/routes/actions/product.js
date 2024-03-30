import { addToCart } from "../../../api/cart";

export const productAction = async ({ params }) =>
  await addToCart(params.productId);

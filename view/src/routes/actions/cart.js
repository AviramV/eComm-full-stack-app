import { redirect } from "react-router-dom";
import { deleteItemFromCart, editItemQuantity } from "../../../api/cart";

export const cartAction = async ({ request }) => {
  const { method } = request;
  const formData = await request.formData();
  const itemId = formData.get("itemId");

  if (method === "PUT") {
    const newQuantity = formData.get("qty");
    return await editItemQuantity(newQuantity, itemId);
  }

  if (method === "DELETE") {
    await deleteItemFromCart(itemId);
    return redirect("/cart");
  }
};

const { loadCart } = require("../../controller/cartItemsService");
const { getCartByUserId } = require("../../controller/cartService");
const { getProductById } = require("../../controller/productService");

// Check if product exists in DB
async function isValidProduct(req, res, next) {
  const { itemId } = req.params;
  const { id } = req.user;
  if (!(await getProductById(itemId)))
    return res.status(400).send({ message: "Item doesn't exist" });
  req.cart = await getCartByUserId(id);
  next();
}

async function isCartEmpty(req, res, next) {
  const { id } = req.user;
  const cart = await loadCart(id);
  if (!cart) return res.send("Cart doesn't exist");
  if (!cart.items) return res.send("Cart is empty");
  req.cart = cart;
  next();
}

module.exports = {
  isValidProduct,
  isCartEmpty,
};

const { loadCart } = require("../../controller/cartItemsService");
const { getCartByUserId } = require("../../controller/cartService");
const { getProductById } = require("../../controller/productService");

// Check if product exists in DB
async function isValidProduct(req, res, next) {
  try {
    const { itemId } = req.params;
    const { id } = req.user;
    if (!(await getProductById(itemId))) throw Error("Item doesn't exist");
    req.cart = await getCartByUserId(id);
    next();
  } catch (error) {
    res.send(error.message);
  }
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

const express = require("express");
const {
  createCart,
  getCartByUserId,
  deleteCart,
} = require("../../controller/cartService");
const {
  loadCart,
  addToCart,
  updateItem,
  removeItem,
} = require("../../controller/cartItemsService");
const {
  createOrder,
  addToOrdersProducts,
} = require("../../controller/orderServices");
const { isLoggedIn } = require("../middleware/auth");
const { isValidProduct, isCartEmpty } = require("../middleware/cart");
const router = express.Router();

module.exports = (app) => {
  app.use("/cart", isLoggedIn, router); // Require user log-in "/cart" route
  // Create a new cart
  router.post("/", async (req, res) => {
    try {
      const { id } = req.user;

      const hasCart = await getCartByUserId(id);
      if (hasCart) return res.status(409).send("Already has an active cart");

      const cart = await createCart(id);
      res.status(201).send(cart);
    } catch (error) {
      res.send(error.message);
    }
  });
  // Get cart contents
  router.get("/", isCartEmpty, async (req, res) => {
    try {
      const { cart } = req;
      res.send(cart.items);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Checkout
  router.post("/checkout", isCartEmpty, async (req, res) => {
    try {
      console.log("checkout: ", req.cart.items);
      const { id } = req.user;
      // Process payment

      // Use cart items to create an order
      const newOrder = await createOrder(id, req.cart);

      // Insert cart items into orders_products
      addToOrdersProducts(newOrder.id, req.cart.items);

      // Delete cart
      deleteCart(req.cart.id);

      res.send(newOrder);
    } catch (error) {
      res.send(error.message);
    }
  });

  // Add a product to cart
  router.post("/:itemId", isValidProduct, async (req, res) => {
    const { itemId } = req.params;
    try {
      // check if user has a cart
      const cart = await loadCart(req.user.id);
      if (!cart) {
        const { user } = req;
        const newCart = await createCart(user.id);
        return res.status(201).send(await addToCart(newCart.id, itemId));
      }

      // If item already exists in cart,
      // update qty instead of adding it again
      const foundItem = cart?.items?.find((item) => item.id == itemId);
      if (foundItem) {
        return res
          .status(201)
          .send(await updateItem(req.cart.id, itemId, foundItem.qty + 1));
      }

      const addedItem = await addToCart(req.cart.id, itemId);
      res.status(201).send(addedItem);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // Update product quantity in cart
  router.put("/:itemId", isValidProduct, async (req, res) => {
    const { itemId } = req.params;
    const { qty } = req.body;

    if (!qty)
      return res.status(400).send({
        message: "Request body must include key 'qty' with a numeric value",
      });

    try {
      const updatedItem = await updateItem(req.cart.id, itemId, qty);
      res.send(updatedItem);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // Remove item from cart
  router.delete("/:itemId", isValidProduct, async (req, res) => {
    const { itemId } = req.params;
    try {
      const removedItem = await removeItem(req.cart.id, itemId);
      res.status(204).send(); // Successfully removed item
    } catch (error) {
      res.send(error.message);
    }
  });
};

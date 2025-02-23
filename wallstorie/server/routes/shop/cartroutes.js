const express = require("express");
const {
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  fetchCartItems,
} = require("../../controllers/shop/cartcontroller");

const router = express.Router();

router.post("/add", addToCart);
router.put("/updateQuantity", updateCartItemQuantity);
router.delete("/:userId/item/:itemId", deleteCartItem);
router.get("/:userId", fetchCartItems);

module.exports = router;

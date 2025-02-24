const express = require("express");
const {
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  fetchCartItems,
  cartitemcount,
} = require("../../controllers/shop/cartcontroller");

const router = express.Router();

router.post("/add", addToCart);
router.put("/updateQuantity", updateCartItemQuantity);
router.delete("/:userId/item/:itemId", deleteCartItem);
router.get("/:userId", fetchCartItems);
router.get("/count/:userId", cartitemcount);

module.exports = router;

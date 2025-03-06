const express = require("express");
const RateLimit = require("express-rate-limit");
const {
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  fetchCartItems,
  cartitemcount,
  emptyCart,
} = require("../../controllers/shop/cartcontroller");

const router = express.Router();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/add", limiter, addToCart);
router.put("/updateQuantity", limiter, updateCartItemQuantity);
router.delete("/:userId/item/:itemId", limiter, deleteCartItem);
router.get("/:userId", limiter, fetchCartItems);
router.get("/count/:userId", limiter, cartitemcount);
router.delete("/:userId/empty", limiter, emptyCart);
module.exports = router;

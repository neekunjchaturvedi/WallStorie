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

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.use(limiter);

router.post("/add", addToCart);
router.put("/updateQuantity", updateCartItemQuantity);
router.delete("/:userId/item/:itemId", deleteCartItem);
router.get("/:userId", fetchCartItems);
router.get("/count/:userId", cartitemcount);
router.delete("/:userId/empty", emptyCart);
module.exports = router;

const express = require("express");
const {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
} = require("../../controllers/shop/cartcontroller");

const router = express.Router();

router.post("/add", addToCart);
router.put("/update", updateCartItemQty);
router.delete("/delete/:userId/:productId", deleteCartItem);
router.get("/:userId", fetchCartItems);

module.exports = router;

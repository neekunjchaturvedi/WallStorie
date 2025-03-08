const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/reviewcontroller");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});
router.use(limiter);
router.post("/add", addProductReview);
router.get("/:productId", limiter, getProductReviews);

module.exports = router;

const express = require("express");
const RateLimit = require("express-rate-limit");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/reviewcontroller");

const router = express.Router();

const addReviewLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});
router.use(addReviewLimiter);
router.post("/add", addProductReview);
router.get("/:productId", addReviewLimiter, getProductReviews);

module.exports = router;

const express = require("express");
const RateLimit = require('express-rate-limit');

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/reviewcontroller");

const router = express.Router();

const addReviewLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/add", addReviewLimiter, addProductReview);
router.get("/:productId", getProductReviews);

module.exports = router;

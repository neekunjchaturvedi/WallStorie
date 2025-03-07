const express = require("express");
const RateLimit = require('express-rate-limit');

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/reviewcontroller");

const router = express.Router();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/add", addProductReview);
router.get("/:productId", limiter, getProductReviews);

module.exports = router;

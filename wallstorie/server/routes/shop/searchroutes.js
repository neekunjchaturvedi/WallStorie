const express = require("express");
const rateLimit = require("express-rate-limit");

const { searchProducts } = require("../../controllers/shop/searchcontroller");

const router = express.Router();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// apply rate limiter to search route
router.get("/:keyword", limiter, searchProducts);

module.exports = router;

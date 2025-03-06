const express = require("express");
const RateLimit = require("express-rate-limit");

const {
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/ordercontroller");

const router = express.Router();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to routes
router.get("/list/:userId", limiter, getAllOrdersByUser);
router.get("/details/:id", limiter, getOrderDetails);

module.exports = router;
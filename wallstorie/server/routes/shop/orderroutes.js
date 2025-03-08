const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/ordercontroller");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(limiter);
router.get("/list/:userId", limiter, getAllOrdersByUser);
router.get("/details/:id", limiter, getOrderDetails);

module.exports = router;

const express = require("express");
const RateLimit = require('express-rate-limit');

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/ordercontrolleradmin");

const router = express.Router();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", limiter, getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
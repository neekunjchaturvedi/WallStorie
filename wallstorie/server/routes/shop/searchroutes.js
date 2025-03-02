const express = require("express");

const { searchProducts } = require("../../controllers/shop/searchcontroller");

const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;

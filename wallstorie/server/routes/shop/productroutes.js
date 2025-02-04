const express = require("express");
const { getWallpaper } = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/products/get", getWallpaper);

module.exports = router;

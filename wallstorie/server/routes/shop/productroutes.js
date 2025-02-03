const express = require("express");

const { getWallpaper } = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/get", getWallpaper);

module.exports = router;

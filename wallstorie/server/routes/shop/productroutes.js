const express = require("express");
const {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
} = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);

module.exports = router;

const express = require("express");
const {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
} = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);
router.get("/getc", getcur);

module.exports = router;

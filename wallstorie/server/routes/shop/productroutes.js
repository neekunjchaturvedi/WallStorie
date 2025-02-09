const express = require("express");
const {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
  getbycategory,
} = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);
router.get("/getc", getcur);
router.get("/category", getbycategory);

module.exports = router;

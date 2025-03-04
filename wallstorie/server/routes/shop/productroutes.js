const express = require("express");
const {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
  getbycategory,
  getproductbyid,
  getartist,
} = require("../../controllers/shop/productcontroller");

const router = express.Router();

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);
router.get("/getc", getcur);
router.get("/getartist", getartist);
router.get("/category", getbycategory);
router.get("/get/:id", getproductbyid);

module.exports = router;

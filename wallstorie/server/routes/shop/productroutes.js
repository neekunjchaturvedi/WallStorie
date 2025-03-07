const express = require("express");
const RateLimit = require("express-rate-limit");
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

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.use(limiter);

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);
router.get("/getc", getcur);
router.get("/getartist", getartist);
router.get("/category", getbycategory);
router.get("/get/:id", getproductbyid);

module.exports = router;

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

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.get("/get", limiter, getWallpaper);
router.get("/getr", limiter, getWallpaperrolls);
router.get("/getb", limiter, getblinds);
router.get("/getc", limiter, getcur);
router.get("/getartist", limiter, getartist);
router.get("/category", limiter, getbycategory);
router.get("/get/:id", limiter, getproductbyid);

module.exports = router;

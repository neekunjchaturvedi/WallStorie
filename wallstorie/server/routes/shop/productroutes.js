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

// apply rate limiter to routes that perform database access
router.use(limiter);

router.get("/get", getWallpaper);
router.get("/getr", getWallpaperrolls);
router.get("/getb", getblinds);
router.get("/getc", getcur);
router.get("/getartist", getartist);
router.get("/category", getbycategory);
router.get("/get/:id", getproductbyid);

module.exports = router;

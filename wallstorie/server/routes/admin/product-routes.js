const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/productcontollers");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/upload-image", upload.single("file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", limiter, deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;

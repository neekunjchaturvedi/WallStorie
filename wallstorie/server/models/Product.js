const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    productName: String,
    description: String,
    productType: String,
    category: String,
    collections: String,
    color: String,
    material: String,
    dimensions: String,
    price: Number,
    salePrice: Number,
    stockQuantity: Number,
    // averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

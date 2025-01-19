const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      productName,
      description,
      productType,
      category,
      collection,
      color,
      material,
      dimensions,
      price,
      salePrice,
      stockQuantity,
    } = req.body;

    const newProduct = new Product({
      image,
      ProductName: productName,
      description,
      productType,
      category,
      collection,
      color,
      material,
      dimensions,
      price,
      salePrice,
      stockQuantity,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      productName,
      description,
      productType,
      category,
      collection,
      color,
      material,
      dimensions,
      price,
      salePrice,
      stockQuantity,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.image = image || product.image;
    product.ProductName = productName || product.ProductName;
    product.description = description || product.description;
    product.productType = productType || product.productType;
    product.category = category || product.category;
    product.collection = collection || product.collection;
    product.color = color || product.color;
    product.material = material || product.material;
    product.dimensions = dimensions || product.dimensions;
    product.price = price !== undefined ? price : product.price;
    product.salePrice = salePrice !== undefined ? salePrice : product.salePrice;
    product.stockQuantity =
      stockQuantity !== undefined ? stockQuantity : product.stockQuantity;

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};

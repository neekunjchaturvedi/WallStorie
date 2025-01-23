const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Handle image upload with tracking
const handleImageUpload = async (req, res) => {
  try {
    // Check for file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Convert file to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary with user tracking
    const result = await imageUploadUtil(dataURI, "22951a3363");

    res.json({
      success: true,
      result: {
        url: result.url,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error uploading image",
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image1,
      image2,
      image3,
      image4,
      productName,
      description,
      productType,
      category,
      collections,
      color,
      material,
      dimensions,
      price,
      salePrice,
      stockQuantity,
    } = req.body;

    // Validate required fields
    if (
      !productName ||
      !description ||
      !productType ||
      !category ||
      !price ||
      !stockQuantity
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate at least one image
    if (!image1) {
      return res.status(400).json({
        success: false,
        message: "Primary image is required",
      });
    }

    const newProduct = new Product({
      image1,
      image2,
      image3,
      image4,
      productName,
      description,
      productType,
      category,
      collections,
      color,
      material,
      dimensions,
      price,
      salePrice,
      stockQuantity,
      createdAt: new Date().toISOString(),
      createdBy: "22951a3363",
    });

    await newProduct.save();

    console.log(`New product created: ${productName} by user 22951a3363`);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error adding product",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("-__v"); // Exclude version key

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching products",
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update only provided fields
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        product[key] = updates[key];
      }
    });

    // Add audit fields
    product.updatedAt = new Date().toISOString();
    product.updatedBy = "22951a3363";

    await product.save();

    console.log(`Product updated: ${id} by user 22951a3363`);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error updating product",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Log the product details before deletion
    console.log(`Product being deleted: ${id} by user 22951a3363`);

    await Product.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting product",
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

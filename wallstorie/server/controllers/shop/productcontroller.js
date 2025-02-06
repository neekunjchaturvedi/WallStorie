const Product = require("../../models/Product");

const getWallpaper = async (req, res) => {
  try {
    const products = await Product.find({ productType: "wallpapers" });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const getWallpaperrolls = async (req, res) => {
  try {
    const products = await Product.find({ productType: "wallpaperRolls" });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const getblinds = async (req, res) => {
  try {
    const products = await Product.find({ productType: "blinds" });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = { getWallpaper, getWallpaperrolls, getblinds };

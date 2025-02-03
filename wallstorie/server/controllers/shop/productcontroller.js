const Product = require("../../models/Product");

const getWallpaper = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { getWallpaper };

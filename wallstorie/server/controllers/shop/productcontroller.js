const Product = require("../../models/Product");

const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({
    success: false,
    message: "Error occurred while processing request",
    error: error.message,
    timestamp: "2025-02-10 17:52:31",
    user: "22951a3363",
  });
};

const getProductsByType = async (req, res, productType) => {
  try {
    const { sort, price, space, trends, colors } = req.query;
    let sortCriteria = { popularity: -1 };
    let filterCriteria = { productType };

    if (sort) {
      switch (sort) {
        case "latest":
          sortCriteria = { createdAt: -1 };
          break;
        case "price":
          sortCriteria = { price: 1 };
          break;
        default:
          sortCriteria = { popularity: -1 };
      }
    }

    if (price && parseFloat(price) > 0) {
      filterCriteria.price = { $lte: parseFloat(price) };
    }

    if (space && space.length > 0) {
      const spaceArray = space.split(",");
      filterCriteria.space = { $in: spaceArray };
    }

    if (trends && trends.length > 0) {
      const trendArray = trends.split(",");
      filterCriteria.trend = { $in: trendArray };
    }

    if (colors && colors.length > 0) {
      const colorArray = colors.split(",");
      filterCriteria.color = { $in: colorArray };
    }

    console.log("Filter Criteria:", filterCriteria);
    console.log("Sort Criteria:", sortCriteria);

    const products = await Product.find(filterCriteria).sort(sortCriteria);

    return res.status(200).json({
      success: true,
      data: products,
      count: products.length,
      timestamp: "2025-02-10 17:52:31",
      user: "22951a3363",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Export the controller functions
const getWallpaper = async (req, res) =>
  getProductsByType(req, res, "wallpapers");
const getWallpaperrolls = async (req, res) =>
  getProductsByType(req, res, "wallpaperRolls");
const getblinds = async (req, res) => getProductsByType(req, res, "blinds");
const getcur = async (req, res) => getProductsByType(req, res, "curtains");

const getbycategory = async (req, res) => {
  try {
    const { category, productType, sortOption, price, space, trends, colors } =
      req.query;

    if (!category || !productType) {
      return res.status(400).json({
        success: false,
        message: "Category and product type are required",
        timestamp: "2025-02-10 17:52:31",
        user: "22951a3363",
      });
    }

    let filterCriteria = {
      category,
      productType,
    };

    if (price && price !== "0") {
      filterCriteria.price = { $lte: parseFloat(price) };
    }

    if (space && space.length > 0) {
      const spaceArray = space.split(",");
      filterCriteria.space = { $in: spaceArray };
    }

    if (trends && trends.length > 0) {
      const trendArray = trends.split(",");
      filterCriteria.trend = { $in: trendArray };
    }

    if (colors && colors.length > 0) {
      const colorArray = colors.split(",");
      filterCriteria.color = { $in: colorArray };
    }

    let sortCriteria = {};
    switch (sortOption) {
      case "latest":
        sortCriteria = { createdAt: -1 };
        break;
      case "price":
        sortCriteria = { price: 1 };
        break;
      default:
        sortCriteria = { popularity: -1 };
    }

    console.log("Filter Criteria:", filterCriteria);
    console.log("Sort Criteria:", sortCriteria);

    const products = await Product.find(filterCriteria)
      .sort(sortCriteria)
      .select("-__v");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      timestamp: "2025-02-10 17:52:31",
      user: "22951a3363",
    });
  } catch (error) {
    console.error("Get by category error:", error);
    return handleError(res, error);
  }
};

module.exports = {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
  getbycategory,
};

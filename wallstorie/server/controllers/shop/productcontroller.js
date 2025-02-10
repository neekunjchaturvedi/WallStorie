const Product = require("../../models/Product");

const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({
    success: false,
    message: "Error occurred while processing request",
    error: error.message,
  });
};

const getProductsByType = async (req, res, productType) => {
  try {
    const { sort, price, space, trends, color } = req.query; // Changed from colors to color
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

    // Multiple color filtering
    if (color && color.length > 0) {
      const colorArray = color.split(",");
      filterCriteria.color = {
        // Changed from colors to color
        $regex: new RegExp(colorArray.join("|"), "i"),
      };
      console.log("Color filter array:", colorArray);
    }

    console.log("Filter Criteria:", filterCriteria);
    console.log("Sort Criteria:", sortCriteria);

    const products = await Product.find(filterCriteria).sort(sortCriteria);

    return res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Export functions remain the same
const getWallpaper = async (req, res) =>
  getProductsByType(req, res, "wallpapers");
const getWallpaperrolls = async (req, res) =>
  getProductsByType(req, res, "wallpaperRolls");
const getblinds = async (req, res) => getProductsByType(req, res, "blinds");
const getcur = async (req, res) => getProductsByType(req, res, "curtains");

const getbycategory = async (req, res) => {
  try {
    const { category, productType, sortOption, price, space, trends, color } =
      req.query; // Changed from colors to color

    if (!category || !productType) {
      return res.status(400).json({
        success: false,
        message: "Category and product type are required",
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

    // Multiple color filtering
    if (color && color.length > 0) {
      const colorArray = color.split(",");
      filterCriteria.color = {
        // Changed from colors to color
        $regex: new RegExp(colorArray.join("|"), "i"),
      };
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

    const products = await Product.find(filterCriteria)
      .sort(sortCriteria)
      .select("-__v");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
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

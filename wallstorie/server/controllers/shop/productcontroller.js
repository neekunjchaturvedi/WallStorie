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
    const { sort, price, space, trends } = req.query;
    let sortCriteria = { popularity: -1 };
    let filterCriteria = { productType };

    // Sorting logic
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

    // Price filter
    if (price && parseFloat(price) > 0) {
      filterCriteria.price = { $lte: parseFloat(price) };
    }

    // Space filter - Fixed to handle array properly
    if (space && space.length > 0) {
      // Check if space is already an array or needs to be split
      const spaceArray = Array.isArray(space) ? space : space.split(",");
      filterCriteria.space = { $in: spaceArray };
      console.log("Space filter array:", spaceArray);
    }

    // Trends filter
    if (trends && trends.length > 0) {
      const trendArray = Array.isArray(trends) ? trends : trends.split(",");
      filterCriteria.trend = { $in: trendArray };
      console.log("Trends filter array:", trendArray);
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

const getWallpaper = async (req, res) => {
  await getProductsByType(req, res, "wallpapers");
};

const getWallpaperrolls = async (req, res) => {
  await getProductsByType(req, res, "wallpaperRolls");
};

const getblinds = async (req, res) => {
  await getProductsByType(req, res, "blinds");
};

const getcur = async (req, res) => {
  await getProductsByType(req, res, "curtains");
};

const getbycategory = async (req, res) => {
  try {
    const { category, productType, sortOption, price, space, trends } =
      req.query;

    if (!category || !productType) {
      return res.status(400).json({
        success: false,
        message: "Category and product type are required",
      });
    }

    let filterCriteria = {
      category: category,
      productType: productType,
    };

    // Price filter
    if (price && price !== "0") {
      filterCriteria.price = { $lte: parseFloat(price) };
    }

    // Space filter - Fixed to handle array properly
    if (space && space.length > 0) {
      // Check if space is already an array or needs to be split
      const spaceArray = Array.isArray(space) ? space : space.split(",");
      filterCriteria.space = { $in: spaceArray };
      console.log("Space filter array:", spaceArray);
    }

    // Trends filter
    if (trends && trends.length > 0) {
      const trendArray = Array.isArray(trends) ? trends : trends.split(",");
      filterCriteria.trend = { $in: trendArray };
      console.log("Trends filter array:", trendArray);
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

    console.log(`Found ${products.length} products for category ${category}`);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get by category error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching products by category",
    });
  }
};

module.exports = {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
  getbycategory,
};

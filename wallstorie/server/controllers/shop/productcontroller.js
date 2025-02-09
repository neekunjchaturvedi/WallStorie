const Product = require("../../models/Product"); // Adjust the path according to your project structure

// Utility function for error handling
const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({
    success: false,
    message: "Error occurred while processing request",
    error: error.message,
  });
};

// Main function to get products by type
const getProductsByType = async (req, res, productType) => {
  try {
    const { sort, price, spaces, trends } = req.query;
    let sortCriteria = { popularity: -1 }; // Default sorting by popularity
    let filterCriteria = { productType };

    // Sorting criteria
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

    // Filtering criteria
    if (price && parseFloat(price) > 0) {
      filterCriteria.price = { $lte: parseFloat(price) };
    }

    // Space filtering
    if (spaces) {
      const spaceArray = spaces.split(",");
      filterCriteria.space = { $in: spaceArray };
    }

    // Trend filtering
    if (trends) {
      const trendArray = trends.split(",");
      filterCriteria.trend = { $in: trendArray };
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

// Controller functions for specific product types
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

// Export all controller functions
module.exports = {
  getWallpaper,
  getWallpaperrolls,
  getblinds,
  getcur,
};

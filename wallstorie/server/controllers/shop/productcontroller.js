const Product = require("../../models/Product");

const getProductsByType = async (req, res, productType) => {
  try {
    const { sort = "popularity", price, colors, spaces, trends } = req.query;
    let sortCriteria = {};
    let filterCriteria = { productType };

    // Sorting criteria
    switch (sort) {
      case "latest":
        sortCriteria = { createdAt: -1 };
        break;
      case "price":
        sortCriteria = { price: 1 };
        break;
      case "popularity":
      default:
        sortCriteria = { popularity: -1 };
        break;
    }

    // Filtering criteria
    if (price && parseInt(price) > 0) {
      filterCriteria.price = { $lte: parseInt(price) };
    }

    if (colors && colors.length) {
      const colorArray = colors.split(",");
      filterCriteria.color = { $in: colorArray };
    }

    if (spaces && spaces.length) {
      const spaceArray = spaces.split(",");
      filterCriteria.space = { $in: spaceArray };
    }

    if (trends && trends.length) {
      const trendArray = trends.split(",");
      filterCriteria.trend = { $in: trendArray };
    }

    console.log("Filter Criteria:", filterCriteria);
    console.log("Sort Criteria:", sortCriteria);

    const products = await Product.find(filterCriteria).sort(sortCriteria);

    console.log(`Found ${products.length} products`);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.error("Error in getProductsByType:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
      error: e.message,
    });
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

module.exports = { getWallpaper, getWallpaperrolls, getblinds, getcur };

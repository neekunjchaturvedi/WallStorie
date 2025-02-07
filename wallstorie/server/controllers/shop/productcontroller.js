const Product = require("../../models/Product");

const getProductsByType = async (req, res, productType) => {
  try {
    const { sort, price, colors, spaces, trends } = req.query;
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
    if (price) {
      filterCriteria.price = { $lte: price };
    }
    if (colors) {
      filterCriteria.color = { $in: colors.split(",") };
    }
    if (spaces) {
      filterCriteria.category = { $in: spaces.split(",") };
    }
    if (trends) {
      filterCriteria.trends = { $in: trends.split(",") };
    }

    const products = await Product.find(filterCriteria).sort(sortCriteria);
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

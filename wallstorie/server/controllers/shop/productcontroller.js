const Product = require("../../models/Product");

const getWallpaper = async (req, res) => {
  try {
    const sortOption = req.query.sort || "popularity";
    let sortCriteria;

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

    const products = await Product.find({ productType: "wallpapers" }).sort(
      sortCriteria
    );
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
    const sortOption = req.query.sort || "popularity";
    let sortCriteria;

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

    const products = await Product.find({ productType: "wallpaperRolls" }).sort(
      sortCriteria
    );
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
    const sortOption = req.query.sort || "popularity";
    let sortCriteria;

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

    const products = await Product.find({ productType: "blinds" }).sort(
      sortCriteria
    );
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

const getcur = async (req, res) => {
  try {
    const sortOption = req.query.sort || "popularity";
    let sortCriteria;

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

    const products = await Product.find({ productType: "curtains" }).sort(
      sortCriteria
    );
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

module.exports = { getWallpaper, getWallpaperrolls, getblinds, getcur };

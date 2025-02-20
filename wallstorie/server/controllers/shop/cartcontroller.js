const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      height,
      width,
      selectedMaterial,
      materialPrice,
    } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find existing cart or create new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    // Calculate area and total price
    let area = 0;
    let totalPrice = 0;

    if (height && width) {
      area = (height * width) / 144; // Convert to square feet
      totalPrice = area * (product.price + (materialPrice || 0)) * quantity;
    } else {
      totalPrice = product.price * quantity;
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    const cartItem = {
      productId,
      quantity,
      totalPrice,
      height,
      width,
      area,
      selectedMaterial,
      productType: product.productType || "standard", // Provide a default value
      productName: product.productName || product.title, // Use product title if productName is not available
      image: product.image1,
    };

    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex] = {
        ...cart.items[existingItemIndex],
        ...cartItem,
        quantity: cart.items[existingItemIndex].quantity + quantity,
        totalPrice: cart.items[existingItemIndex].totalPrice + totalPrice,
      };
    } else {
      // Add new item
      cart.items.push(cartItem);
    }

    // Save the cart
    await cart.save();

    // Populate product details
    await cart.populate("items.productId");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

exports.updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cartItem = cart.items[itemIndex];
    let totalPrice = 0;
    if (cartItem.height && cartItem.width) {
      const area = (cartItem.height * cartItem.width) / 144;
      totalPrice =
        area * (product.price + (cartItem.materialPrice || 0)) * quantity;
    } else {
      totalPrice = product.price * quantity;
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = totalPrice;

    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: error.message,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Delete cart item error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
    });
  }
};

exports.fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
      error: error.message,
    });
  }
};

const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Order } = require("../../models/orders"); // Assuming you have an Order model

// Initialize Razorpay instance
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify payment signature
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generatedSignature === signature) {
      // Payment is successful, update order status
      await Order.updateOne(
        { "items.orderId": order_id },
        { $set: { "items.$.status": "Paid" } }
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

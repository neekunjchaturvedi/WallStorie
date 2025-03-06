const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authrouter = require("./routes/auth/auth-rotes");
const adminProductsRouter = require("./routes/admin/product-routes");
const shopProductRouter = require("./routes/shop/productroutes");
const shopcartRouter = require("./routes/shop/cartroutes");
const shopAddressRouter = require("./routes/shop/addressroutes");
const paymentRouter = require("./routes/shop/paymentroutes");
const shopOrderRouter = require("./routes/shop/orderroutes");
const adminOrderRouter = require("./routes/admin/orderroutes");
const shopSearchRouter = require("./routes/shop/searchroutes");
const reviewRouter = require("./routes/shop/reviewroutes");
const userinforouter = require("./routes/auth/userinfo-routes");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authrouter);
app.use("/api/info", userinforouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopcartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

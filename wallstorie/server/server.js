const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authrouter = require("./routes/auth/auth-rotes");
const adminProductsRouter = require("./routes/admin/product-routes");
const shopProductRouter = require("./routes/shop/productroutes");
const shopcartRouter = require("./routes/shop/cartroutes");
const shopAddressRouter = require("./routes/shop/addressroutes");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://neekunjchaturvedi3:rishiyogitha@cluster0.pe2yh.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopcartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

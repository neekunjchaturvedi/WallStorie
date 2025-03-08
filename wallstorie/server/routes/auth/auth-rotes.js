const express = require("express");
const RateLimit = require("express-rate-limit");
const {
  authMiddleware,
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/auth/authcontroller");

const router = express.Router();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/register", limiter, registerUser);
router.post("/login", limiter, loginUser);
router.post("/logout", limiter, logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

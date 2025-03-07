const express = require("express");
const RateLimit = require("express-rate-limit");
const {
  authMiddleware,
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/auth/authcontroller");

const router = express.Router();

// set up rate limiter: maximum of 5 requests per minute
const loginLimiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 requests per windowMs
});

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

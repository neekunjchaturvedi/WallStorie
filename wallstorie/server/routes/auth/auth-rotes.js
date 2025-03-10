const express = require("express");
const RateLimit = require("express-rate-limit");
const {
  authMiddleware,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require("../../controllers/auth/authcontroller");

const router = express.Router();


const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

router.post("/register", limiter, registerUser);
router.post("/login", limiter, loginUser);
router.post("/logout", limiter, logoutUser);
router.post("/refresh", limiter, refreshToken);

router.get("/check-auth", limiter, authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

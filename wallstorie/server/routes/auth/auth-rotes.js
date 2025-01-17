const express = require("express");
const {
  registeruser,
  loginuser,
  logoutuser,
  authMiddleware,
} = require("../../controllers/auth/authcontroller");

const router = express.Router();

router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/logout", logoutuser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

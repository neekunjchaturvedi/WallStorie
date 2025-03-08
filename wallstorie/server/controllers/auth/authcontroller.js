const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email: { $eq: email } });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be phone or email

  try {
    let checkUser;
    if (isNaN(identifier)) {
      // If identifier is not a number, treat it as an email
      checkUser = await User.findOne({ email: identifier });
    } else {
      // If identifier is a number, treat it as a phone number
      checkUser = await User.findOne({ phone: identifier });
    }

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        name: checkUser.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "15m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        name: checkUser.name,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};

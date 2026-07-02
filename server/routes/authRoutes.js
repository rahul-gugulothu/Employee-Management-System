const express = require("express");

const {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

module.exports = router;
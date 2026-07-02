const User = require("../models/User");
const TempUser = require("../models/TempUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendEmail");

// ============================
// REGISTER
// ============================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    await TempUser.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await TempUser.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ============================
// VERIFY OTP
// ============================

const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({
        success: false,
        message: "Registration expired. Please register again.",
      });
    }

    if (new Date() > tempUser.otpExpires) {
      await TempUser.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please register again.",
      });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
    });

    await TempUser.deleteOne({ email });

    res.status(201).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ============================
// RESEND OTP
// ============================

const resendOTP = async (req, res) => {

  try {

    const { email } = req.body;

    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    tempUser.otp = otp;
    tempUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await tempUser.save();

    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "OTP resent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ============================
// LOGIN
// ============================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ============================
// FORGOT PASSWORD
// ============================

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "Password reset OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  forgotPassword,
};
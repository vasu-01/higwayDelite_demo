import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { generateOtp } from "../helper/helper.js";
import { sendEmail } from "../services/emailService.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      "Something went wrong whie generating refresh and access tokens"
    );
  }
};

// User signup controller
const signupEmail = async (req, res) => {
  try {
    const { email, fullName, dob } = req.body;
    if (!email || !fullName || !dob) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const { otpCode, otpExpiry } = generateOtp();

    await Otp.create({
      email,
      otpCode,
      otpExpiry,
      fullName,
      dob,
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is ${otpCode}`);

    return res
      .status(200)
      .json({ success: true, message: "OTP Sent to your email" });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, error, message: "Server error" });
  }
};

const signupverifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const userExist = await Otp.findOne({ email, otpCode });
    if (!userExist) {
      return res.status(400).json({ error: "Invalid or expired otp!" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = await User.create({
      fullName: userExist.fullName,
      dob: userExist.dob,
      email,
    });

    await Otp.deleteMany({ email });

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedInuser = await User.findById(user._id).select("-refreshToken");
    // console.log("loggedInUser:", loggedInuser);

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "OTP verified successfully!",
        user,
        accessToken,
        refreshToken,
        loggedInuser,
      });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      error: error,
      message: "Something went wrong!r",
    });
  }
};

//User signin controller
const signIn = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email id is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!, Please signup first!",
      });
    }

    const { otpCode, otpExpiry } = generateOtp();
    await Otp.create({
      email,
      otpCode,
      otpExpiry,
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is ${otpCode}`);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to you email" });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, error: error, message: "Server error" });
  }
};

const signinverifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const userExist = await Otp.findOne({ email, otpCode });
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired otp" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!, Please signup!" });
    }

    await Otp.deleteMany({ email });

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedInuser = await User.findById(user._id).select("-refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "OTP verified successfully!",
        user,
        accessToken,
        refreshToken,
        loggedInuser,
      });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, error: error, message: "Something went wrong!" });
  }
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "User logged out" });
};

export { signupEmail, signupverifyOtp, signIn, signinverifyOtp, logout };

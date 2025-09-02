import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { generateOtp } from "../helper/helper.js";
import { sendEmail } from "../services/emailService.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

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
    // console.log("email:", email.trim(), "  otp:", otpCode.trim());

    const userExist = await Otp.findOne({ email, otpCode });
    // console.log(userExist);
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Email verification successfull!",
        user,
        token,
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, error: error, message: "Something went wrong!" });
  }
};

export { signupEmail, signupverifyOtp, signIn, signinverifyOtp };

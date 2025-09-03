import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "Unauthorized request" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("-refreshToken");
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.user = user;
    console.log("reached here");

    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({
      success: false,
      error: error,
      message: "Token expired or invalid",
    });
  }
};

export default authMiddleware;

import express, { Router } from "express";
import {
  signupEmail,
  signupverifyOtp,
  signIn,
  signinverifyOtp,
  logout,
} from "../controller/user.controller.js";
import authMiddleware from "../middleware/user.authMiddleware.js";

const router = Router();

//signup routes
router.post("/signup", signupEmail);

router.post("/signup/verify-otp", signupverifyOtp);

//signin routes
router.post("/signin", signIn);

router.post("/signin/verify-otp", signinverifyOtp);

//logout
router.post("/logout", authMiddleware, logout);
export default router;

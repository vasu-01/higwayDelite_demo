import express, { Router } from "express";
import {
  signupEmail,
  signupverifyOtp,
  signIn,
  signinverifyOtp,
} from "../controller/user.controller.js";

const router = Router();

//signup routes
router.post("/signup", signupEmail);

router.post("/signup/verify-otp", signupverifyOtp);

//signin routes
router.post("/signin", signIn);

router.post("/signin/verify-otp", signinverifyOtp);

export default router;

import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otpCode: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  dob: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export const Otp = new mongoose.model("Otp", otpSchema);

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// //pre-hashing of password before storing
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   }
// });

// //comparison of password
// userSchema.methods.generateAccessToken = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export const User = mongoose.model("User", userSchema);

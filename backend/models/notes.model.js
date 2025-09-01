import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    trim: true,
  },
});

export const Notes = new mongoose.model("Note", notesSchema);

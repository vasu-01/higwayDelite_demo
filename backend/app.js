import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);

console.log("cors", process.env.CORS_ORIGIN);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

import userRouter from "./routes/user.route.js";

app.use("/api/v1/user", userRouter);

import notesRouter from "./routes/note.route.js";

app.use("/api/v1", notesRouter);

export { app };

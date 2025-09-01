import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

import userRouter from "./routes/user.route.js";

app.use("/api/v1/user", userRouter);

export { app };

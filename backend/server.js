import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/dbConfig.js";

import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb failed to connect", err);
  });

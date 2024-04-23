import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "../routes/blog.router.js";
import authRouter from "../routes/auth.router.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT | 8000;

app.use("/api/blog", blogRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.DB)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    })
  )
  .catch((error) => console.log(error.message));

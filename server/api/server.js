import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blog.router.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import commentRouter from "./routes/comment.router.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT | 8000;

const __dirname = path.resolve();

app.use("/api/blog", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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

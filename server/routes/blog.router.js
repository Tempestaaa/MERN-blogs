import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controllers.js";
import verifiedUser from "../utils/verifiedUser.js";

const blogRouter = express.Router();

blogRouter.get("/getblogs", getAllBlogs);
blogRouter.post("/create", verifiedUser, createBlog);

export default blogRouter;

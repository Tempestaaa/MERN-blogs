import express from "express";
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controllers.js";
import verifiedUser from "../utils/verifiedUser.js";

const blogRouter = express.Router();

blogRouter.get("/getblogs", getAllBlogs);
blogRouter.post("/create", verifiedUser, createBlog);
blogRouter.delete("/deleteblog/:blogId/:userId", verifiedUser, deleteBlog);
blogRouter.put("/updateblog/:blogId/:userId", verifiedUser, updateBlog);

export default blogRouter;

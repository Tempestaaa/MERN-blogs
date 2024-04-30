import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
} from "../controllers/blog.controllers.js";
import verifiedUser from "../utils/verifiedUser.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/create", verifiedUser, createBlog);
blogRouter.get("/blogs/:id", getBlog);
blogRouter.put("/blogs/:id", editBlog);
blogRouter.delete("/blogs/:id", deleteBlog);

export default blogRouter;

import Blog from "../models/blog.schema.js";
import asyncHandler from "express-async-handler";

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) res.json({ message: "Blog not found" });
  res.json(blog);
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json({ message: `${blog.title} created` });
});

export const editBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
  if (!blog) res.json({ message: "Blog not found" });
  res.json({ message: `${blog.title} updated` });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) res.json({ message: "Blog not found" });
  res.json({ message: `${blog.title} has been deleted` });
});

import Blog from "../models/blog.schema.js";
import errorHandler from "../utils/errorHandler.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) res.json({ message: "Blog not found" });
  res.json(blog);
};

export const createBlog = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to create a post"));

  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, "Please provide all required fields"));

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "");

  const newPost = new Blog({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const editBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
  if (!blog) res.json({ message: "Blog not found" });
  res.json({ message: `${blog.title} updated` });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) res.json({ message: "Blog not found" });
  res.json({ message: `${blog.title} has been deleted` });
};

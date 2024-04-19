import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

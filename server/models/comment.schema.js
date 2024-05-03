import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    blogId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      default: [],
    },

    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

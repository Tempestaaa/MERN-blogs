import errorHandler from "../utils/errorHandler.js";
import Comment from "../models/comment.schema.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, blogId, userId } = req.body;

    if (userId !== req.user.id)
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );

    const newComment = new Comment({
      content,
      blogId,
      userId,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

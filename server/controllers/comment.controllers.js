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

export const getBlogComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    if (comment.userId !== req.user.id && !req.user.isAdmin)
      return next(
        errorHandler(403, "You are now allowed to edit this comment")
      );

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

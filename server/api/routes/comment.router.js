import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import {
  createComment,
  getBlogComments,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controllers.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifiedUser, createComment);
commentRouter.get("/getblogcomments/:blogId", getBlogComments);
commentRouter.put("/likecomment/:commentId", verifiedUser, likeComment);
commentRouter.put("/editcomment/:commentId", verifiedUser, editComment);
commentRouter.delete("/deletecomment/:commentId", verifiedUser, deleteComment);
commentRouter.get("/getcomments", verifiedUser, getComments);

export default commentRouter;

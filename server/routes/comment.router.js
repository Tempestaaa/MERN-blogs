import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import {
  createComment,
  getBlogComments,
  likeComment,
} from "../controllers/comment.controllers.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifiedUser, createComment);
commentRouter.get("/getblogcomments/:blogId", getBlogComments);
commentRouter.put("/likecomment/:commentId", verifiedUser, likeComment);

export default commentRouter;

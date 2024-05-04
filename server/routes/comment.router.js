import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import {
  createComment,
  getBlogComments,
} from "../controllers/comment.controllers.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifiedUser, createComment);
commentRouter.get("/getblogcomments/:blogId", getBlogComments);

export default commentRouter;

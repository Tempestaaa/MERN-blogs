import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import { createComment } from "../controllers/comment.controllers.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifiedUser, createComment);

export default commentRouter;

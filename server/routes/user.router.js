import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import { updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/update/:userId", verifiedUser, updateUser);

export default userRouter;

import express from "express";
import verifiedUser from "../utils/verifiedUser.js";
import {
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/update/:userId", verifiedUser, updateUser);
userRouter.delete("/delete/:userId", verifiedUser, deleteUser);
userRouter.post("/signout", signOut);
userRouter.get("/getusers", verifiedUser, getUsers);
userRouter.get("/:userId", getUser);

export default userRouter;

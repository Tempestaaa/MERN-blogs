import express from "express";
import { SignUp, signIn } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", signIn);

export default authRouter;

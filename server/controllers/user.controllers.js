import User from "../models/user.schema.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";

export const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === null ||
    email === null ||
    password === null
  )
    return next(errorHandler(400, "Some fields are empty! Fill them up"));

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json({ message: `${newUser.username} created` });
  } catch (error) {
    next(error);
  }
});

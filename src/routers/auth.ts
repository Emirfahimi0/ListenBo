import { Router } from "express";
import { userModel } from "../models";

export const authRouter = Router();

authRouter.post("/create", async (req, res) => {
  const { name, email, password } = req.body();
  const newUser = new userModel({ name, email, password });
  newUser.save();
  const createdUser = await userModel.create({ name, email, password });
  res.json({ newUser: createdUser });
});

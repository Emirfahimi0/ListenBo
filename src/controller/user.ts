import { RequestHandler } from "express";
import { userModel } from "../models";
import { ICreatedUser } from "../types/user";

export const createUser: RequestHandler = async (req: ICreatedUser, res) => {
  const { name, email, password } = req.body;

  // const newUser = new userModel({ name, email, password });
  // newUser.save();
  const createdUser = await userModel.create({ name, email, password });
  return res.status(201).json({ newUser: createdUser });
};

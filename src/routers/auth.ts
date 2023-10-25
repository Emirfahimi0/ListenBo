import { Router } from "express";
import { userModel } from "../models";
import { ICreatedUser } from "../types/user";
import { createUserSchema } from "../utils/validation";
import { validatorAuth } from "../middleware/validator";

export const authRouter = Router();

authRouter.post(
  "/create",
  validatorAuth(createUserSchema),
  async (req: ICreatedUser, res) => {
    const { name, email, password } = req.body;
    createUserSchema.validate({ name, email, password });

    // const newUser = new userModel({ name, email, password });
    // newUser.save();
    const createdUser = await userModel.create({ name, email, password });
    return res.json({ newUser: createdUser });
  }
);

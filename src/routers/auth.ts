import { Router } from "express";
import { createUserSchema } from "../utils/validation";
import { validatorAuth } from "../middleware/validator";
import { createUser } from "../controller";

export const authRouter = Router();

authRouter.post("/create", validatorAuth(createUserSchema), createUser);

import { Router } from "express";
import {
  createUserValidation,
  emailTokenVerification,
} from "../utils/validation";
import { validatorAuth } from "../middleware/validator";
import { createUser, verifyEmail } from "../controller";

export const authRouter = Router();

authRouter.post("/create", validatorAuth(createUserValidation), createUser);
authRouter.post(
  "/verify-email",
  validatorAuth(emailTokenVerification),
  verifyEmail
);

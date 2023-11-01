import { Router } from "express";
import {
  createUserValidation,
  emailTokenVerification,
  signInValidation,
  updatePasswordValidation,
} from "../utils/validation";
import { validatorAuth } from "../middleware/validator";
import {
  createUser,
  generatePassword,
  grantAccessValid,
  grantedAuth,
  reVerifyEmail,
  signIn,
  updatePassword,
  verifyEmail,
} from "../controller";
import { verifyAuth, verifyPassword } from "../middleware/auth";

export const authRouter = Router();

authRouter.post("/create", validatorAuth(createUserValidation), createUser);
authRouter.post(
  "/verify-email",
  validatorAuth(emailTokenVerification),
  verifyEmail
);
authRouter.post("/re-verify-email", reVerifyEmail);
authRouter.post("/forget-password", generatePassword);
authRouter.post(
  "/verify-password-token",
  validatorAuth(emailTokenVerification),
  verifyPassword,
  grantAccessValid
);
authRouter.post(
  "/update-password",
  validatorAuth(updatePasswordValidation),
  verifyPassword,
  updatePassword
);
authRouter.post("/sign-in", validatorAuth(signInValidation), signIn);
authRouter.get("/authorized", verifyAuth, grantedAuth);

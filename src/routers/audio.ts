import { Router } from "express";
import { fileParser, isVerified, verifyAuth } from "../middleware/auth";
import { audioValidation } from "../utils";
import { validator } from "../middleware/validator";
import { createAudio, updateAudio } from "../controller";

export const audioRouter = Router();

audioRouter.post(
  "/create",
  verifyAuth,
  isVerified,
  fileParser,
  validator(audioValidation),
  createAudio
);
audioRouter.patch(
  "/update-audio/:audioId",
  verifyAuth,
  isVerified,
  fileParser,
  validator(audioValidation),
  updateAudio
);

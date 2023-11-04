import { Router } from "express";
import { fileParser, verifyAuth } from "../middleware/auth";
import { audioValidation } from "../utils";
import { validator } from "../middleware/validator";
import { createAudio } from "../controller";

export const audioRouter = Router();

audioRouter.post(
  "/create",
  verifyAuth,
  fileParser,
  validator(audioValidation),
  createAudio
);

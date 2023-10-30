import { RequestHandler } from "express";
import { passwordTokenModel } from "../models/passwordReset";

export const verifyPassword: RequestHandler = async (req, res, next) => {
  const { token, userId } = req.body;
  const resetToken = await passwordTokenModel.findOne({ owner: userId });
  if (resetToken === null)
    return res.status(403).json({
      error: "Unauthorized access! Token is not valid",
    });

  const result = await resetToken.compareToken(token);
  if (result === false)
    return res
      .status(403)
      .json({ error: "Unauthorized access! Token is not valid" });

  next();
};

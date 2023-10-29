import { RequestHandler } from "express";
import { MAIL_TRAP_SENDER, generateToken, handleEmailSender } from "../utils";
import { generateEmail, generateEmailTemplate } from "../mail/template";
import { ENGLISH } from "../constant";
import path from "path";
import { emailTokenModel, userModel } from "../models";

const { MAIL } = ENGLISH;

export const createUser: RequestHandler = async (req: ICreatedUser, res) => {
  const { name, email, password } = req.body;

  // const newUser = new userModel({ name, email, password });
  // newUser.save();
  const createdUser = await userModel.create({ name, email, password });

  const token = generateToken();
  await handleEmailSender(token, emailTokenModel, {
    name,
    email,
    userId: createdUser._id.toString(),
  });

  return res.status(201).json({ newUser: createdUser });
};

export const verifyEmail: RequestHandler = async (req: IVerifyEmail, res) => {
  const { token, userId } = req.body;

  const verificationToken = await emailTokenModel.findOne({ owner: userId });

  if (verificationToken === null)
    return res.status(403).json({
      error: "Invalid email verification!",
    });

  const isVerified = await verificationToken.compareToken(token);
  if (!isVerified)
    return res.status(403).json({ error: "Invalid. Token does not match!" });

  await userModel.findByIdAndUpdate(userId, { verified: true });
  await emailTokenModel.findByIdAndDelete(verificationToken._id);

  res.json({ success: "Your email is verified!" });
};

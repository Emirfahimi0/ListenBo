import { RequestHandler } from "express";
import { PASSWORD_RESET_URL, generateToken, handleEmailSender } from "../utils";
import { emailTokenModel, userModel } from "../models";
import { isValidObjectId } from "mongoose";
import { passwordTokenModel } from "../models/passwordReset";
import crypto from "crypto";
import { ENGLISH } from "../constant";
import path from "path";
const { MAIL, PASSWORD } = ENGLISH;

export const createUser: RequestHandler = async (req: ICreatedUser, res) => {
  const { name, email, password } = req.body;

  // const newUser = new userModel({ name, email, password });
  // newUser.save();
  const createdUser = await userModel.create({ name, email, password });

  const token = generateToken();

  await emailTokenModel.create({
    owner: createdUser._id,
    token,
  });

  const tokenTemplate: IEmailOptions = {
    title: MAIL.TITLE,
    message: MAIL.WELCOME,
    requestMessage: MAIL.DIDNT_REQUEST_TOKEN,
    label: MAIL.VERIFICATION_RECEIVED,
    banner: path.join(__dirname, "../mails/images/animated_header.gif"),
    logo: "cid:logo",
    link: "#",
    buttonTitle: token,
  };

  await handleEmailSender(
    {
      name,
      email,
    },
    tokenTemplate
  );

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
  if (isVerified === false)
    return res.status(403).json({ error: "Invalid. Token does not match!" });

  await userModel.findByIdAndUpdate(userId, { verified: true });
  await emailTokenModel.findByIdAndDelete(verificationToken._id);

  res.json({ success: "Your email is verified!" });
};

export const reVerifyEmail: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId))
    return res.status(403).json({ error: "Invalid request!" });

  const user = await userModel.findById(userId);
  if (user === null) return res.status(403).json({ error: "Invalid request!" });

  await emailTokenModel.findOneAndDelete({ owner: userId });

  const token = generateToken();
  await emailTokenModel.create({
    owner: userId,
    token,
  });
  const tokenTemplate: IEmailOptions = {
    title: MAIL.TITLE,
    message: MAIL.WELCOME,
    requestMessage: MAIL.DIDNT_REQUEST_TOKEN,
    label: MAIL.VERIFICATION_RECEIVED,
    banner: path.join(__dirname, "../mails/images/animated_header.gif"),
    logo: "cid:logo",
    link: "#",
    buttonTitle: token,
  };

  handleEmailSender({ name: user?.name, email: user?.email }, tokenTemplate);

  res.json({ message: "Please check back your email" });
};

export const generatePassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const result = await userModel.findOne({ email });

  if (result === null)
    return res.status(404).json({ error: "Account not found" });

  await passwordTokenModel.findOneAndDelete({ owner: result._id });

  const token = crypto.randomBytes(36).toString("hex");

  await passwordTokenModel.create({
    owner: result,
    token,
  });

  const resetLink = `${PASSWORD_RESET_URL}?token=${token}&userId=${result._id}`;

  const forgetPasswordTemplate: IEmailOptions = {
    title: PASSWORD.FORGOT_TITLE,
    message: PASSWORD.PASSWORD_MESSAGE,
    requestMessage: PASSWORD.DIDNT_REQUEST_PASSWORD,
    label: PASSWORD.FORGOT_PASSWORD_LABEL,
    banner: path.join(__dirname, "../mails/images/animated_header.gif"),
    logo: "cid:logo",
    link: resetLink,
    buttonTitle: token,
  };

  await handleEmailSender(
    {
      email: result.email,
    },
    forgetPasswordTemplate
  );

  res.json({ message: "check your registered email" });
};

export const grantAccessValid: RequestHandler = (req, res) => {
  res.json({ valid: true });
};

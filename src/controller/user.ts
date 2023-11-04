import { RequestHandler } from "express";
import {
  JWT_SECRET_KEY,
  PASSWORD_RESET_URL,
  SIGN_IN_URL,
  formatProfile,
  generateToken,
  handleEmailSender,
} from "../utils";
import { emailTokenModel, userModel, passwordTokenModel } from "../models";
import { isValidObjectId } from "mongoose";
import crypto from "crypto";
import { ENGLISH } from "../constant";
import path from "path";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "../cloud";
const { MAIL, PASSWORD, UPDATE_PASSWORD } = ENGLISH;

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
    tokenTemplate,
    MAIL.SUBJECT
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

  handleEmailSender(
    { name: user?.name, email: user?.email },
    tokenTemplate,
    MAIL.RE_VERIFY_EMAIL_SUBJECT
  );

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
    forgetPasswordTemplate,
    PASSWORD.PASSWORD_SUBJECT
  );

  res.json({ message: "check your registered email" });
};

export const grantAccessValid: RequestHandler = (req, res) => {
  res.json({ valid: true });
};

export const updatePassword: RequestHandler = async (req, res) => {
  const { password, userId } = req.body;

  const user = await userModel.findById(userId);
  if (user === null)
    return res.status(403).json({ error: " unathorized access!" });
  const isMatch = await user.comparePassword(password);
  if (isMatch === false)
    return res.status(422).json({
      error: "The new password must be different from the old password!",
    });
  user.password = password;
  await user.save();

  await passwordTokenModel.findOneAndDelete({ owner: user._id });
  const newMessage = `Dear ${user.name}. ${UPDATE_PASSWORD.UPDATE_MESSAGE}`;
  const forgetPasswordTemplate: IEmailOptions = {
    title: UPDATE_PASSWORD.UPDATE_TITLE,
    message: newMessage,
    requestMessage: PASSWORD.DIDNT_REQUEST_PASSWORD,
    label: UPDATE_PASSWORD.UPDATED_PASSWORD,
    banner: path.join(__dirname, "../mails/images/animated_header.gif"),
    logo: "cid:logo",
    link: SIGN_IN_URL,
    buttonTitle: UPDATE_PASSWORD.UPDATE_PASSWORD_SUCCESS,
  };

  await handleEmailSender(
    {
      email: user.email,
    },
    forgetPasswordTemplate,
    UPDATE_PASSWORD.UPDATE_SUBJECT
  );
  res.json({ message: "Password reset successfully" });
};

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user === null)
    return res.status(403).json({ error: "Email or password mismatch!" });

  const isMatch = await user.comparePassword(password);

  if (isMatch === false)
    return res.status(403).json({ error: "Password is not match!" });

  const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {});
  user.tokens.push(jwtToken);

  await user.save();

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatarFile?.url,
      followers: user.followers.length,
      following: user.followings.length,
    },
    jwtToken,
  });
};

export const sendProfile: RequestHandler = (req, res) => {
  res.json({
    profile: req.user,
  });
};

export const updateProfile: RequestHandler = async (
  req: IReqWithFiles,
  res
) => {
  const { name } = req.body;
  const avatar = req.files?.avatar as formidable.File;

  const user = await userModel.findById(req.user.id);
  if (user === null) throw new Error("User not found, something went wrong");

  if (typeof name !== "string")
    return res.status(422).json({ error: "Invalid profile name" });

  if (name.trim().length < 3)
    return res
      .status(422)
      .json({ error: "Invalid profile name, name is too short" });

  user.name = name;

  if (avatar) {
    if (user.avatarFile?.publicId !== undefined) {
      await cloudinary.uploader.destroy(user.avatarFile.publicId);
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      avatar.filepath,
      {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
      }
    );
    user.avatarFile = { url: secure_url, publicId: public_id };
  }
  await user.save();

  res.json({ profile: formatProfile(user) });
};

export const logOut: RequestHandler = async (req, res) => {
  const { fromAll } = req.query;

  const token = req.token;

  const user = await userModel.findById(req.user.id);

  if (user === null) throw new Error("User not found, something went wrong");

  if (fromAll === "yes") user.tokens = [];
  else user.tokens = user.tokens.filter((eachToken) => eachToken !== token);

  user.save();
  res.json({ sucess: true });
};

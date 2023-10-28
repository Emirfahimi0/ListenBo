import { RequestHandler } from "express";
import { userModel } from "../models";
import {
  GMAIL_APP_USE,
  GMAIL_USER,
  MAIL_TRAP_PASS,
  MAIL_TRAP_SENDER,
  MAIL_TRAP_USER,
  generateToken,
} from "../utils";
import { generateEmail, generateEmailTemplate } from "../mail/template";
import { ENGLISH } from "../constant";
import path from "path";

const { MAIL } = ENGLISH;

export const createUser: RequestHandler = async (req: ICreatedUser, res) => {
  const { name, email, password } = req.body;

  // const newUser = new userModel({ name, email, password });
  // newUser.save();
  const createdUser = await userModel.create({ name, email, password });

  const token = generateToken();

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
  const nodeMailer = generateEmail();
  nodeMailer.sendMail({
    to: createdUser.email,
    from: MAIL_TRAP_SENDER,
    html: generateEmailTemplate(tokenTemplate),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/images/logo.png"),
        cid: "logo",
      },
    ],
  });

  return res.status(201).json({ newUser: createdUser });
};

import path from "path";
import { CHARACTER } from "../constant";
import { ENGLISH } from "../constant";
import { Model } from "mongoose";
import { generateEmail, generateEmailTemplate } from "../mail/template";
import { MAIL_TRAP_SENDER } from "./variables";
const { MAIL } = ENGLISH;

export const generateToken = (length = 6) => {
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTER.length);
    token += CHARACTER[randomIndex];
  }

  return token;
};

interface IProfile {
  email: string;
  name: string;
  userId: string;
}

export const handleEmailSender = async (
  token: string,
  emailTokenModel: Model<IEmailVerifiedToken, {}, ITokenMethods>,
  createdUser: IProfile
) => {
  const { email, userId, name } = createdUser;

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
  await emailTokenModel.create({
    owner: userId,
    token,
  });

  const nodeMailer = generateEmail();
  nodeMailer.sendMail({
    to: email,
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
};

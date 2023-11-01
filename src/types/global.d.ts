import { Request } from "express";
import { ObjectId } from "mongoose";

declare global {
  interface IUserDocument {
    avatarFile?: { url: string; publicId: string };
    email: string;
    favourites: ObjectId[];
    followers: ObjectId[];
    followings: ObjectId[];
    name: string;
    password: string;
    tokens: string[];
    verified: boolean;
  }
  interface IProfileReq {
    id: Types.ObjectId;
    name: string;
    email: string;
    verified: boolean;
    avatar: string | undefined;
    followers: number;
    following: number;
  }
  namespace Express {
    interface Request {
      user: IProfileReq;
    }
  }
  interface ICreatedUser extends Request {
    body: {
      email: string;
      name: string;
      password: string;
    };
  }

  interface IVerifyEmail extends Request {
    body: {
      token: string;
      userId: string;
    };
  }
  interface ITokenMethods {
    compareToken(token: string): Promise<boolean>;
  }

  interface IPasswordMethods {
    comparePassword(password: string): Promise<boolean>;
  }

  interface IEmailOptions {
    banner: string;
    buttonTitle?: string;
    label?: string;
    link: string;
    logo: string;
    message: string;
    requestMessage: string;
    title: string;
  }
  interface IVerifiedToken {
    createdAt: Date;
    owner: ObjectId;
    token: string;
  }
}

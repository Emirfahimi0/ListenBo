import { Request } from "express";
import { ObjectId } from "mongoose";

declare interface IUserDocument {
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

declare interface ICreatedUser extends Request {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

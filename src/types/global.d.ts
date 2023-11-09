import { Request } from "express";
import { ObjectId } from "mongoose";
import { File } from "formidable";

declare global {
  interface IUserDocument {
    _id: ObjectId;
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
    avatar: string | undefined;
    email: string;
    followers: number;
    following: number;
    id: Types.ObjectId;
    name: string;
    verified: boolean;
  }
  namespace Express {
    interface Request {
      user: IProfileReq;
      token: string;
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

  interface IReqWithFiles extends Request {
    files?: { [key: string]: File };
  }
  interface IFileData {
    publicId: string;
    url: string;
  }

  interface IAudioDocument<T = ObjectId> {
    _id: ObjectId;
    about: string;
    category: TCategoriesPlaylist;
    file: IFileData;
    likes: ObjectId[];
    owner: T;
    poster?: IFileData;
    title: string;
  }

  interface IFavouriteDocument {
    owner: ObjectId;
    items: ObjectId[];
  }

  interface IPlaylistDocument {
    items: ObjectId[];
    owner: ObjectId;
    title: string;
    visibility: TPlaylistVisibility;
  }
  interface IReqPlaylistDocument extends Request {
    body: {
      resId: string;
      title: string;
      visibility: TPlaylistDefaultVisibility;
    };
  }
  interface IReqUpdatePlaylistDocument extends Request {
    body: {
      id: string;
      item: string;
      title: string;
      visibility: TPlaylistDefaultVisibility;
    };
  }
}

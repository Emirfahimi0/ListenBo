type userId = string; // need to clarify with MongoDB
type audioRef = string;

type TAvatarFile = {
  url: string;
  publicId: string;
};

declare interface NewCreatedUser {
  createdAt: string;
  email: string;
  favourites: audioRef[];
  followers: userId[];
  followings: userId[];
  name: string;
  avatarFile?: TAvatarFile;
  password: string;
  tokens: string[];
  updatedAt: string;
  verified: boolean;
  __v: number;
  _id: userId;
}

declare interface IUserProfile {
  avatar: string | undefined;
  email: string;
  followers: number;
  following: number;
  id: string;
  name: string;
  verified: boolean;
}

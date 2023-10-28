import { compare, hash } from "bcrypt";
import { Model, Schema, model } from "mongoose";

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [String],
    avatarFile: {
      type: Object,
      url: String,
      publicId: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Audio",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const emailVerifiedTokenSchema = new Schema<
  IEmailVerifiedToken,
  {},
  ITokenMethods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 60 min * 60 sec = 3600s;
    default: Date.now(),
  },
});

emailVerifiedTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const enCryptedResult = (this.token = await hash(this.token, 10));
  }
  next();
});

emailVerifiedTokenSchema.methods.compareToken = async function (token) {
  const compareToken = await compare(token, this.token);
  return compareToken;
};

export const emailTokenModel: Model<IEmailVerifiedToken> = model(
  "EmailVerifiedToken",
  emailVerifiedTokenSchema
);

export const userModel: Model<IUserDocument> = model("User", userSchema);

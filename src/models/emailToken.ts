import { compare, hash } from "bcrypt";
import { Model, Schema, model } from "mongoose";

const emailVerifiedTokenSchema = new Schema<IVerifiedToken, {}, ITokenMethods>({
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
    this.token = await hash(this.token, 10);
  }
  next();
});

emailVerifiedTokenSchema.methods.compareToken = async function (token) {
  const compareToken = await compare(token, this.token);
  return compareToken;
};

export const emailTokenModel: Model<IVerifiedToken, {}, ITokenMethods> = model(
  "EmailVerifiedToken",
  emailVerifiedTokenSchema
);

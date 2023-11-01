import { RequestHandler } from "express";
import { passwordTokenModel } from "../models/passwordReset";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils";
import { userModel } from "../models";

export const verifyPassword: RequestHandler = async (req, res, next) => {
  const { token, userId } = req.body;
  const resetToken = await passwordTokenModel.findOne({ owner: userId });
  if (resetToken === null)
    return res.status(403).json({
      error: "Unauthorized access! Token is not valid",
    });

  const result = await resetToken.compareToken(token);
  if (result === false)
    return res
      .status(403)
      .json({ error: "Unauthorized access! Token is not valid" });

  next();
};

// Private Route Middleware
export const verifyAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  if (token === undefined)
    return res.status(403).json({ error: "Unauthorized Request!" });

  const payload = verify(token, JWT_SECRET_KEY) as JwtPayload;

  const user = await userModel.findById({ _id: payload.userId, tokens: token });
  if (user === null)
    return res.status(403).json({ error: "Unauthorized Request!" });

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    avatar: user.avatarFile?.url,
    followers: user.followers.length,
    following: user.followings.length,
  };
  next();
};

import { RequestHandler } from "express";
import { passwordTokenModel } from "../models";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils";
import { userModel } from "../models";
import formidable from "formidable";

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

  req.token = token;
  next();
};

export const fileParser: RequestHandler = async (
  req: IReqWithFiles,
  res,
  next
) => {
  if (req.headers["content-type"]?.startsWith("multipart/form-data") === false)
    return res.json({ error: "Not a multipart form data!" });

  const form = formidable({ multiples: false });
  const [fields, files] = await form.parse(req);

  for (let key in fields) {
    const field = fields[key];
    if (field !== undefined) {
      req.body[key] = field[0];
    }
  }

  const checkReqFiles = req.files !== undefined ? req.files : {};

  for (let key in files) {
    const file = files[key];
    checkReqFiles[key] = file![0];
  }
  next();
};

export const isVerified: RequestHandler = async (req, res, next) => {
  const isVerified = req.user.verified;

  if (isVerified === false)
    return res.status(403).json({ error: "Please verify your email account!" });
};

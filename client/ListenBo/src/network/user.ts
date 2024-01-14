import { requestHandler } from "./RequestHandler";
import { client } from "./client";

interface LogInResponse {
  profile: IUserProfile | null;
}

interface createdUserResponse {
  newUser: NewCreatedUser | null;
}

interface verificationResponse {
  success: string | null;
}
interface ReVerificationResponse {
  message: string | null;
}

export const logIn = requestHandler<IUserNetwork.RequestCreateAccount, LogInResponse>((body) => client.post("/auth/sign-in", body));

export const createAccount = requestHandler<IUserNetwork.RequestCreateAccount, createdUserResponse>((params) =>
  client.post("/auth/create", params),
);

export const verifyAccountByEmail = requestHandler<IUserNetwork.EmailVerifyRequest, verificationResponse>((verifyRequest) =>
  client.post("/verify-email", verifyRequest),
);

export const reVerifyAccountByEmail = requestHandler<IUserNetwork.ReVerifyEmail, ReVerificationResponse>((userIdRequest) =>
  client.post("/re-verify-email", userIdRequest),
);

export const forgotPassword = requestHandler<IUserNetwork.ForgotPassword, ReVerificationResponse>((email) =>
  client.post("/forget-password", email),
);

declare interface ISignUpForm {
  email: string;
  name?: string;
  password: string;
  errorEmail?: string;
  errorName?: string;
  errorPassword?: string;
}

declare namespace IUserNetwork {
  interface IRecoverEmail {
    email: string;
    error?: string;
  }

  interface ForgotPassword {
    email: string;
  }

  interface RequestCreateAccount {
    name?: string;
    email: string;
    password: string;
  }

  interface EmailVerifyRequest {
    userId: string;
    token: string;
  }

  interface ReVerifyEmail {
    userId: string;
  }

  interface JwtTokenRequest {
    token: string;
  }
}

interface IOTPCode {
  code: string | undefined;
  error: string | undefined;
  isSuccess: boolean;
}

interface newUser {
  createdAt: string;
  email: string;
  name: string;
  token: string[];
  updatedAt: string;
  userId: userId;
  verified: boolean;
}

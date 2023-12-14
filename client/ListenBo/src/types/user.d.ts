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

  interface IRequestCreateAccount {
    name?: string;
    email: string;
    password: string;
  }
}

interface IOTPCode {
  code: string | undefined;
  error: string | undefined;
  isSuccess: boolean;
}

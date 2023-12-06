declare interface ISignUpForm {
  email: string;
  name?: string;
  password: string;
  errorEmail?: string;
  errorName?: string;
  errorPassword?: string;
}

declare interface IRequestBody {
  name?: string;
  email: string;
  password: string;
}

declare namespace IUserInterface {
  interface IUserRecovery {
    email: string;
    error?: string;
  }
}

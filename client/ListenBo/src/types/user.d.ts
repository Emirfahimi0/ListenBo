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

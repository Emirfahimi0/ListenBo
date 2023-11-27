interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  errorEmail?: string;
  errorName?: string;
  errorPassword?: string;
}

interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

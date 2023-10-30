import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const createUserValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),

  email: yup
    .string()
    .trim()
    .required("Email is missing")
    .email("Invalid email id!"),
  password: yup
    .string()
    .min(8, "Password is too short!")
    .required("Password is missing!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const emailTokenVerification = yup.object().shape({
  token: yup.string().trim().required("Invalid token!"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }
      return "";
    })
    .required("Invalid user Id"),
});

export const updatePasswordValidation = yup.object().shape({
  token: yup.string().trim().required("Invalid token!"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }
      return "";
    })
    .required("Invalid user Id"),
  password: yup
    .string()
    .min(8, "Password is too short!")
    .required("Password is missing!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const isArrayNotEmpty = (value: unknown[] | null | undefined) => {
  return value !== null && value !== undefined && value.length > 0;
};

export const isNotEmpty = (
  value: string | number | boolean | object | undefined | null
) => {
  return value !== null && value !== undefined;
};

export const isEmpty = (
  value: string | number | boolean | object | undefined | null
) => {
  return value === null || value === undefined;
};

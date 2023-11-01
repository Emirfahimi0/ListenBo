import { isValidObjectId } from "mongoose";
import * as yup from "yup";
import { ENGLISH, PASSREGEX } from "../constant";

const { VALIDATION } = ENGLISH;
export const createUserValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(VALIDATION.NAME_MISSING)
    .min(3, VALIDATION.NAME_SHORT)
    .max(20, VALIDATION.NAME_LONG),

  email: yup
    .string()
    .trim()
    .required(VALIDATION.EMAIL_ADDRESS_MISSING)
    .email(VALIDATION.EMAIL_INVALID),
  password: yup
    .string()
    .required(VALIDATION.PASSWORD_MISSING)
    .min(8, VALIDATION.PASSWORD_SHORT)
    .matches(PASSREGEX, VALIDATION.PASSWORD_MATCHES),
});

export const emailTokenVerification = yup.object().shape({
  token: yup.string().trim().required(VALIDATION.INVALID_TOKEN),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }
      return "";
    })
    .required(VALIDATION.INVALID_USER_ID),
});

export const updatePasswordValidation = yup.object().shape({
  token: yup.string().trim().required(VALIDATION.INVALID_TOKEN),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }
      return "";
    })
    .required(VALIDATION.INVALID_USER_ID),
  password: yup
    .string()
    .required(VALIDATION.PASSWORD_MISSING)
    .min(8, VALIDATION.PASSWORD_SHORT)
    .matches(PASSREGEX, VALIDATION.PASSWORD_MATCHES),
});

export const signInValidation = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION.EMAIL_ADDRESS_MISSING)
    .email(VALIDATION.EMAIL_INVALID),
  password: yup.string().trim().required(VALIDATION.PASSWORD_MISSING),
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

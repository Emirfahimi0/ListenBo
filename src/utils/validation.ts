import { isValidObjectId } from 'mongoose';
import * as yup from 'yup';
import { CATEGORIES, ENGLISH, PASSREGEX } from '../constant';

const { VALIDATION } = ENGLISH;
export const createUserValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(VALIDATION.NAME_MISSING)
    .min(3, VALIDATION.NAME_SHORT)
    .max(20, VALIDATION.NAME_LONG),

  email: yup.string().trim().required(VALIDATION.EMAIL_ADDRESS_MISSING).email(VALIDATION.EMAIL_INVALID),
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
      return '';
    })
    .required(VALIDATION.INVALID_USER_ID),
});

export const updatePasswordValidation = yup.object().shape({
  token: yup.string().trim().required(VALIDATION.INVALID_TOKEN),
  userId: yup
    .string()
    .transform(function (value) {
      return this.isType(value) && isValidObjectId(value) ? value : '';
    })
    .required(VALIDATION.INVALID_USER_ID),
  password: yup
    .string()
    .required(VALIDATION.PASSWORD_MISSING)
    .min(8, VALIDATION.PASSWORD_SHORT)
    .matches(PASSREGEX, VALIDATION.PASSWORD_MATCHES),
});

export const signInValidation = yup.object().shape({
  email: yup.string().required(VALIDATION.EMAIL_ADDRESS_MISSING).email(VALIDATION.EMAIL_INVALID),
  password: yup.string().trim().required(VALIDATION.PASSWORD_MISSING),
});

export const audioValidation = yup.object().shape({
  title: yup.string().trim().required(VALIDATION.TITLE_MISSING),
  about: yup.string().trim().required(VALIDATION.ABOUT_MISSING),
  category: yup.string().oneOf(CATEGORIES, VALIDATION.INVALID_CATEGORIES).required(VALIDATION.CATEGORY_MISSING),
});

export const playlistValidation = yup.object().shape({
  title: yup.string().trim().required(VALIDATION.TITLE_MISSING),
  resId: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : '';
  }),
  visibility: yup
    .string()
    .oneOf(['Public', 'Private'], VALIDATION.INVALID_VISIBILITY)
    .required(VALIDATION.VISIBILITY_MISSING),
});

export const oldPlaylistValidation = yup.object().shape({
  title: yup.string().trim().required(VALIDATION.TITLE_MISSING),
  item: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : '';
  }),
  id: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : '';
  }),
  visibility: yup.string().oneOf(['Public', 'Private'], VALIDATION.INVALID_VISIBILITY),
});

export const updateHistoryValidation = yup.object().shape({
  audio: yup
    .string()
    .transform(function (value) {
      return this.isType(value) && isValidObjectId(value) ? value : '';
    })
    .required(VALIDATION.INVALID_AUDIO_ID),
  progress: yup.number().required(VALIDATION.HISTORY_MISSING),
  date: yup
    .string()
    .transform(function (value) {
      const date = new Date(value);
      return date instanceof Date ? value : '';
    })
    .required(VALIDATION.INVALID_DATE),
});

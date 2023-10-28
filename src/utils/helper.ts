import { CHARACTER } from "../constant";

export const generateToken = (length = 6) => {
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTER.length);
    token += CHARACTER[randomIndex];
  }

  return token;
};

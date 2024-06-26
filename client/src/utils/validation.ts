export const isValidEmail = (email: string) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
};
export const isPasswordValid = (password: string) => {
  // Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*])(?=.{8,})/;
  return passwordRegex.test(password);
};

export const isNotEmptyString = (value: string, error?: string): boolean => value !== "" && error !== undefined;

export const isUndefined = (value: null | undefined | []) => {
  return value === null || value === undefined || value.length === 0;
};

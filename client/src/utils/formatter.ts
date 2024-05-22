export const newUserFormatter = (user: NewCreatedUser) => {
  const value = user instanceof Object ? true : false;

  if (value === false) {
    return;
  }

  const newFormatter: newUser = {
    createdAt: user.createdAt,
    email: user.email,
    name: user.name,
    token: user.tokens,
    updatedAt: user.updatedAt,
    userId: user._id,
    verified: user.verified,
  };

  return newFormatter;
};

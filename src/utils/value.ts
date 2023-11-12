export const isArrayNotEmpty = (value: unknown[] | null | undefined) => {
  return value !== null && value !== undefined && value.length > 0;
};

export const isNotEmpty = (
  value: string | number | boolean | object | undefined | null,
) => {
  return value !== null && value !== undefined;
};

export const isEmpty = (
  value: string | number | boolean | object | undefined | null,
) => {
  return value === null || value === undefined;
};

import { isAxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const catchAsyncError = (error: any) => {
  let errorMsg = error.message;

  if (isAxiosError(error)) {
    const errorResponse = error.response?.data;

    if (errorResponse) {
      errorMsg = errorResponse.error;
    }
  }
  return errorMsg;
};

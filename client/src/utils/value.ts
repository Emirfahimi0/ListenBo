export const mapRange = (options: IUploadProgress): number => {
  const { inputMin, inputMax, outputMax, outputMin, value } = options;

  const result = ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;

  if (result === Infinity) {
    return 0;
  }
  return result;
};

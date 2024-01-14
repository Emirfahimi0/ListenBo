import { Dimensions, PixelRatio } from "react-native";

const { height, width } = Dimensions.get("window");

const baseHeight = 360;
const baseWidth = 640;

const calculateScaleFactor = () => {
  const baseHypotenuse = Math.sqrt(baseWidth * baseWidth + baseHeight * baseHeight);
  const deviceHypotenuse = Math.sqrt(width * width + height * height);

  return deviceHypotenuse < baseHypotenuse || deviceHypotenuse > baseHypotenuse ? deviceHypotenuse / baseHypotenuse : 1;
};

const scaleFactor = calculateScaleFactor();

export const scaleHeight = (size: number) => PixelRatio.roundToNearestPixel(size * scaleFactor);
export const scaleWidth = (size: number) => PixelRatio.roundToNearestPixel(size * scaleFactor);

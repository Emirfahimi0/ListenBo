import { SharedTransition, withSpring } from "react-native-reanimated";
import { SharedTransitionAnimationsValues } from "react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/commonTypes";

const { custom } = SharedTransition;

export const PageTransition = custom((values: SharedTransitionAnimationsValues) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

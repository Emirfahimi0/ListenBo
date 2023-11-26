import Icomoon from "react-native-icomoon";
import type { IconMoonProps } from "react-native-icomoon";
import json from "../../constants/Icons/selection.json";

type IconProps = Omit<IconMoonProps, "iconSet">;

export const Icon = ({ name, ...restProps }: IconProps) => {
  return <Icomoon iconSet={json} name={name} {...restProps} />;
};

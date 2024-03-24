import Icomoon from "react-native-icomoon";
import type { IconMoonProps } from "react-native-icomoon";
import json from "../../constants/Icons/selection.json";
import { IconNames } from "../../types/icon";

export type IconProps = Omit<IconMoonProps, "iconSet"> & { name: IconNames };

export const Icon = ({ name, ...restProps }: IconProps) => {
  return <Icomoon iconSet={json} name={name} {...restProps} />;
};

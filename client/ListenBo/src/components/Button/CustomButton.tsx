import React, { Fragment, FunctionComponent, useCallback, useState } from "react";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";
import {
  border,
  centerHorizontal,
  colorGray,
  colorRose,
  colorTransparent,
  colorWhite,
  flexRow,
  fs16BoldWhite1,
  fsCapitalize,
  sh16,
  sh4,
  sw2,
  sw20,
  sw240,
  sw8,
} from "../../styles";
import { debounce } from "lodash";
import { CircleSnail } from "react-native-progress";
import { CustomSpacer } from "../spacer";
import { Icon } from "../Icons";

interface ICustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  loading?: boolean;
  onPress: () => void;
  secondary?: boolean;
  text: string;
  textStyle?: TextStyle;
  withDebounce?: boolean;
}

export const CustomButton: FunctionComponent<ICustomButtonProps> = ({
  buttonStyle,
  disabled,
  icon,
  iconColor,
  iconSize,
  loading,
  onPress,
  secondary,
  text,
  textStyle,
  withDebounce,
}: ICustomButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const debouncePress = useCallback(
    debounce(onPress, 1000, {
      leading: true,
      trailing: false,
    }),
    [onPress],
  );

  const color = ((hover === true && secondary !== true) || loading === true) && disabled !== true ? colorRose._1 : colorRose._3;

  const defaultButtonStyle: ViewStyle = {
    ...flexRow,
    ...border(color, sw2),
    ...centerHorizontal,
    backgroundColor: secondary ? colorTransparent : color,
    paddingVertical: sh4,
    opacity: disabled === true ? 0.5 : 1,
    width: sw240,
    ...buttonStyle,
  };

  const defaultIconColor = iconColor !== undefined ? iconColor : colorWhite._1;
  const textColor = secondary ? colorGray._6 : colorWhite._1;

  const handlePress = () => {
    if (withDebounce === true) {
      debouncePress();
    } else {
      onPress();
    }
  };

  return (
    <Fragment>
      <Pressable
        onPress={disabled === true ? undefined : handlePress}
        onPressIn={() => setHover(true)}
        onPressOut={() => setHover(false)}
        style={defaultButtonStyle}>
        {loading === true ? (
          <Fragment>
            <CircleSnail color={colorWhite._1} size={sw20} thickness={sw2} />
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        ) : null}
        {icon === undefined ? null : (
          <Fragment>
            <Icon color={defaultIconColor} name={icon} size={iconSize || sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        )}
        <Text style={{ ...fs16BoldWhite1, ...fsCapitalize, color: textColor, ...textStyle }}>{text}</Text>
      </Pressable>
    </Fragment>
  );
};

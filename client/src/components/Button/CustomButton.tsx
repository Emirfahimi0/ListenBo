import React, { Fragment, FunctionComponent, useCallback, useState } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import {
  border,
  centerHV,
  centerHorizontal,
  colorGray,
  colorRose,
  colorTransparent,
  colorWhite,
  flexRow,
  fs16BoldWhite1,
  fsCapitalize,
  sh18,
  sh4,
  sw2,
  sw20,
  sw240,
  sw4,
  sw8,
} from "../../styles";
import { debounce } from "lodash";
import { CircleSnail } from "react-native-progress";
import { CustomSpacer } from "../spacer";
import { Icon } from "../Icons";
import { IconNames } from "../../types/icon";

interface ICustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  icon?: IconNames;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <View style={{ ...flexRow, ...centerHV }}>
          <Text style={{ ...fs16BoldWhite1, ...fsCapitalize, color: textColor, ...textStyle }}>{text}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          {icon === undefined ? null : (
            <Fragment>
              <Icon color={defaultIconColor} name={icon} size={iconSize || sh18} />
            </Fragment>
          )}
        </View>
      </Pressable>
    </Fragment>
  );
};

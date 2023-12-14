import React, { FunctionComponent } from "react";
import { Pressable, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { flexRow, centerHorizontal, fs12BoldGray1, sw4, fs12RegRose2 } from "../../styles";
import { CustomSpacer } from "../spacer";

interface ILabelLinkProps {
  centerPosition?: true;
  disabledLink: boolean;
  label: string;
  labelStyle?: TextStyle;
  onPressAction: () => void;
  subLabel?: string;
  subLabelStyle?: TextStyle;
  subLink?: boolean;
  timer?: number;
}

export const LabelLink: FunctionComponent<ILabelLinkProps> = ({
  centerPosition,
  disabledLink,
  label,
  labelStyle,
  onPressAction,
  subLabel,
  subLabelStyle,
  subLink,
  timer,
}: ILabelLinkProps) => {
  const isCenterRequired = centerPosition !== undefined && centerPosition === true ? centerHorizontal : undefined;
  const defaultStyle: ViewStyle = { ...flexRow, ...isCenterRequired };

  const defaultLabelTextStyle: TextStyle = labelStyle !== undefined ? { ...fs12BoldGray1, ...labelStyle } : fs12BoldGray1;
  const defaultSubLabelStyle: TextStyle = subLabelStyle !== undefined ? { ...fs12RegRose2, ...labelStyle } : fs12RegRose2;

  const checkTimer = timer! > 0 ? `${label} (${timer})` : label;

  const defaultLabel = timer === undefined ? label : checkTimer;

  const disablePress = timer === undefined ? null : timer > 0;

  return (
    <View style={defaultStyle}>
      <Pressable onPress={onPressAction} disabled={disablePress}>
        <Text style={defaultLabelTextStyle}>{defaultLabel}</Text>
      </Pressable>
      <CustomSpacer isHorizontal={true} space={sw4} />
      {subLink === undefined || subLink === false ? null : (
        <TouchableOpacity disabled={disabledLink} onPress={onPressAction}>
          <Text style={defaultSubLabelStyle}>{subLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

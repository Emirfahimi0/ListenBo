import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { flexRow, centerHorizontal, fs12BoldGray1, sw4, fs12RegRose2 } from "../../styles";
import { CustomSpacer } from "../spacer";

interface ILabelLinkProps {
  disabledLink: boolean;
  label: string;
  labelStyle?: TextStyle;
  subLabel: string;
  subLabelStyle?: TextStyle;
  subLink?: boolean;
  onPressAction: () => void;
}

export const LabelLink: FunctionComponent<ILabelLinkProps> = ({
  disabledLink,
  label,
  labelStyle,
  onPressAction,
  subLabel,
  subLabelStyle,
  subLink,
}: ILabelLinkProps) => {
  const defaultLabelTextStyle: TextStyle = labelStyle !== undefined ? labelStyle : fs12BoldGray1;
  const defaultSubLabelStyle: TextStyle = subLabelStyle !== undefined ? subLabelStyle : fs12RegRose2;

  return (
    <View style={{ ...flexRow, ...centerHorizontal }}>
      <Text style={defaultLabelTextStyle}>{label}</Text>
      <CustomSpacer isHorizontal={true} space={sw4} />
      {subLink === undefined || subLink === false ? null : (
        <TouchableOpacity disabled={disabledLink} onPress={onPressAction}>
          <Text style={defaultSubLabelStyle}>{subLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

import React, { Fragment, FunctionComponent } from "react";
import { ActivityIndicator, Text } from "react-native";
import { CircleSnail } from "react-native-progress";
import { colorGreen, sw16, sw2, sw8, fs10BoldGray1 } from "../../styles";
import { CustomSpacer } from "../spacer";

interface ILoadingProps {
  label?: string;
  size?: number;
  secondary: boolean;
}

export const Loading: FunctionComponent<ILoadingProps> = ({ label, secondary, size }: ILoadingProps) => {
  const defaultSize = size === undefined ? sw16 : size;
  return (
    <Fragment>
      {secondary === false ? (
        <ActivityIndicator size={defaultSize} color={colorGreen._1} />
      ) : (
        <CircleSnail color={colorGreen._1} size={defaultSize} thickness={sw2} />
      )}

      <CustomSpacer space={sw8} />
      {label === undefined ? null : <Text style={fs10BoldGray1}>{label}</Text>}
    </Fragment>
  );
};

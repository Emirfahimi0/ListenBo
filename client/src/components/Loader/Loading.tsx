import React, { Fragment, FunctionComponent } from "react";
import { ActivityIndicator, Text } from "react-native";
import { CircleSnail } from "react-native-progress";
import { colorGreen, sw16, sw2, sw8, fs10BoldGray1 } from "../../styles";
import { CustomSpacer } from "../spacer";

interface ILoadingProps {
  label?: string;
  secondary: boolean;
}

export const Loading: FunctionComponent<ILoadingProps> = ({ label, secondary }: ILoadingProps) => {
  return (
    <Fragment>
      {secondary === false ? (
        <ActivityIndicator size={sw16} color={colorGreen._1} />
      ) : (
        <CircleSnail color={colorGreen._1} size={sw16} thickness={sw2} />
      )}

      <CustomSpacer space={sw8} />
      {label === undefined ? null : <Text style={fs10BoldGray1}>{label}</Text>}
    </Fragment>
  );
};

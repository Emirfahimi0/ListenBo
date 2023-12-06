import React, { Fragment, FunctionComponent, useState } from "react";
import { NativeSyntheticEvent, Text, TextInputFocusEventData, View, ViewStyle } from "react-native";
import { sw8, sh4 } from "../../styles";
import { CustomTextInput } from "../Input";
import { LANGUAGE } from "../../constants";

const { FORM } = LANGUAGE;

interface IRecoveryEmailProps {
  label: string;
  prefixStyle?: ViewStyle;
  spaceToTop?: number;
  title: string;
}

export const RecoveryEmail: FunctionComponent<IRecoveryEmailProps> = ({ title, label, spaceToTop, prefixStyle }: IRecoveryEmailProps) => {
  const [recoveryEmail, setRecoveryEmail] = useState<IUserInterface.IUserRecovery>({ email: "" });

  const { email, error } = recoveryEmail;

  const defaultContainerStyle: ViewStyle = {
    paddingTop: spaceToTop == undefined ? undefined : spaceToTop,
    paddingVertical: sw8,
  };

  const handleOnChangeEmail = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setRecoveryEmail({ email: event.nativeEvent.text });
  };

  const handleOnBlurEmail = () => {};

  const handleOnFocusEmail = () => {};

  return (
    <Fragment>
      <View style={defaultContainerStyle}>
        <Text>{title}</Text>
        <Text>{label}</Text>
        <CustomTextInput
          label={FORM.EMAIL_ADDRESS_LABEL}
          labelHolder={FORM.ENTER_EMAIL_LABEL}
          error={error}
          value={email}
          onChange={handleOnChangeEmail}
          onBlur={handleOnBlurEmail}
          onFocus={handleOnFocusEmail}
          keyboardType="email-address"
          containerStyle={{ paddingVertical: sh4 }}
        />
      </View>
    </Fragment>
  );
};

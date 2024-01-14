import React, { Fragment, FunctionComponent } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  Text,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from "react-native";
import {
  sh4,
  sw30,
  fs12BoldGray1,
  sh18,
  fs20BoldBlack2,
  sw4,
  flexChild,
  sh24,
  sw10,
  centerVertical,
  sw20,
  colorOrange,
  colorTransparent,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { LANGUAGE } from "../../constants";
import { CustomButton } from "../Button";
import { isValidEmail } from "../../utils";

const { FORM } = LANGUAGE;

interface IRecoveryEmailFormProps {
  handleRecoveryEmail: () => void;
  label: string;
  prefixStyle?: ViewStyle;
  recoveryEmail: IUserNetwork.IRecoverEmail;
  setRecoveryEmail: (value: IUserNetwork.IRecoverEmail) => void;
  spaceToInput?: number;
  spaceToTop?: number;
  title: string;
}

export const RecoveryEmailForm: FunctionComponent<IRecoveryEmailFormProps> = ({
  label,
  handleRecoveryEmail,
  prefixStyle,
  setRecoveryEmail,
  spaceToInput,
  spaceToTop,
  title,
  recoveryEmail,
}: IRecoveryEmailFormProps) => {
  const { email, error } = recoveryEmail;

  const defaultContainerStyle: ViewStyle = {
    paddingTop: spaceToTop === undefined ? undefined : spaceToTop,
    paddingVertical: sh18,
    ...prefixStyle,
  };

  const handleOnChangeEmail = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setRecoveryEmail({ ...recoveryEmail, email: event.nativeEvent.text });
  };

  const handleOnBlurEmail = () => {
    let error = "";
    if (email === "") {
      error = FORM.ENTER_EMAIL_LABEL;
      return setRecoveryEmail({ ...recoveryEmail, error: error });
    }
    if (isValidEmail(email) === false) {
      error = FORM.ERROR_INVALID_EMAIL;
      return setRecoveryEmail({ ...recoveryEmail, error: error });
    }

    return setRecoveryEmail({ ...recoveryEmail });
  };

  const handleOnFocusEmail = () => {
    setRecoveryEmail({ ...recoveryEmail, error: undefined });
  };

  const disable = email === "" || (email !== "" && error !== undefined);

  return (
    <Fragment>
      <ScrollView style={flexChild}>
        <View style={{ paddingHorizontal: sw30, ...flexChild, ...centerVertical }}>
          <KeyboardAvoidingView
            style={defaultContainerStyle}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}>
            <View style={{ paddingHorizontal: sw4, paddingBottom: spaceToInput === undefined ? sh24 : spaceToInput }}>
              <Text style={fs20BoldBlack2}>{title}</Text>
              <Text style={fs12BoldGray1}>{label}</Text>
            </View>
            <CustomTextInput
              label={FORM.EMAIL_ADDRESS_LABEL}
              labelHolder={FORM.ENTER_EMAIL_LABEL}
              error={error}
              value={email}
              onChange={handleOnChangeEmail}
              onBlur={handleOnBlurEmail}
              onFocus={handleOnFocusEmail}
              keyboardType="email-address"
              containerStyle={{ paddingVertical: sh4, borderRadius: sw10 }}
            />
          </KeyboardAvoidingView>
          <CustomButton
            onPress={handleRecoveryEmail}
            disabled={disable}
            icon={"ios-arrow-forward"}
            buttonStyle={buttonStyle}
            text={FORM.CONTINUE_LABEL}
            loading={false}
            withDebounce={true}
          />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const buttonStyle: ViewStyle = {
  borderRadius: sw20,
  borderColor: colorTransparent,
  backgroundColor: colorOrange._1,
};

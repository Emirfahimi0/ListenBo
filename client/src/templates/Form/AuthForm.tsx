import React, { Fragment, FunctionComponent, useState } from "react";
import {
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerHV,
  colorRose,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldGray1,
  fsAlignCenter,
  justifyContentStart,
  sh10,
  sh152,
  sh16,
  sh4,
  sw12,
  sw152,
  sw16,
  sw20,
  sw4,
  sw44,
  sw8,
} from "../../styles";
import { LANGUAGE } from "../../constants";
import { CustomButton, CustomSpacer, CustomTextInput, Icon } from "../../components";
import { isPasswordValid, isValidEmail } from "../../utils";

const { FORM } = LANGUAGE;

export interface IAuthFormTemplatesProps {
  authForm: ISignUpForm;
  continueLabel: string;
  disableContinue: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  loading?: boolean;
  setValue: (value: ISignUpForm) => void;
  showModal?: () => void;
  subContent: JSX.Element;
}

export const AuthFormTemplates: FunctionComponent<IAuthFormTemplatesProps> = ({
  handlePreviousPage,
  authForm,
  continueLabel,
  disableContinue,
  handleNextPage,
  loading,
  showModal,
  subContent,
  setValue,
}: IAuthFormTemplatesProps) => {
  const { email, name, password, errorEmail, errorName, errorPassword } = authForm;
  const [visibility, setVisiblity] = useState<boolean | undefined>(undefined);

  const handleOnChangeEmail = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setValue({ ...authForm, ...{ email: event.nativeEvent.text } });
  };

  const handleOnChangeName = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setValue({ ...authForm, ...{ name: event.nativeEvent.text } });
  };

  const handleOnChangePassword = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setVisiblity(true);
    setValue({ ...authForm, ...{ password: event.nativeEvent.text } });
  };

  const handleOnBlurEmail = () => {
    let error = "";
    if (email === "") {
      error = FORM.EMAIL_ADDRESS_EMPTY;
      return setValue({ ...authForm, ...{ errorEmail: error } });
    }

    if (isValidEmail(email) === false) {
      error = FORM.ERROR_INVALID_EMAIL;
      return setValue({ ...authForm, ...{ errorEmail: error } });
    }

    return setValue({ ...authForm, ...{ errorEmail: undefined } });
  };

  const handleOnBlurName = () => {
    let error = "";

    if (name === undefined) {
      return;
    }

    if (name.trim() === "") {
      error = FORM.NAME_EMPTY;
      return setValue({ ...authForm, ...{ errorName: error } });
    }
    if (name.length < 3) {
      error = FORM.NAME_MIN;
      return setValue({ ...authForm, ...{ errorName: error } });
    }
    if (name.length > 20) {
      error = FORM.NAME_MAX;
      return setValue({ ...authForm, ...{ errorName: error } });
    }

    return setValue({ ...authForm, ...{ errorName: undefined } });
  };

  const handleOnBlurPassword = () => {
    let error = "";

    if (password === "") {
      error = FORM.PASSWORD_EMPTY;
      return setValue({ ...authForm, ...{ errorPassword: error } });
    }
    if (isPasswordValid(password) === false) {
      error = FORM.PASSWORD_INVALID;
      return setValue({ ...authForm, ...{ errorPassword: error } });
    }

    return setValue({ ...authForm, ...{ errorPassword: undefined } });
  };

  const handleOnFocusEmail = () => {
    setValue({ ...authForm, ...{ errorEmail: undefined } });
  };
  const handleOnFocusName = () => {
    setValue({ ...authForm, ...{ errorName: undefined } });
  };
  const handleOnFocusPassword = () => {
    setValue({ ...authForm, ...{ errorPassword: undefined } });
  };

  const setSecureText = () => {
    return setVisiblity(!visibility);
  };

  const openModal = () => {
    if (showModal) {
      showModal();
    } else {
      return;
    }
  };

  const backgroundStyle: ViewStyle = {
    backgroundColor: colorRose._1,
    ...flexChild,
  };

  const arrowStyle: ViewStyle = {
    padding: sw12,
    marginLeft: sw4,
    marginTop: sw4,
  };

  const borderBottomContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw44,
    borderTopRightRadius: sw44,
    paddingHorizontal: sw20,
    paddingTop: sh16,
  };

  return (
    <View style={backgroundStyle}>
      <View style={{ paddingVertical: sh10 }}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle} onPress={handlePreviousPage}>
            <Icon color={colorWhite._3} name="ios-arrow-left" size={sw20} strokeWidth={sw20} />
          </TouchableOpacity>
        </View>

        <View style={centerHV}>
          <Image source={require("../../assets/images/login.png")} style={{ height: sh152, width: sw152 }} />
        </View>
      </View>
      <ScrollView style={borderBottomContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
          <CustomTextInput
            label={FORM.EMAIL_ADDRESS_LABEL}
            labelHolder={FORM.ENTER_EMAIL_LABEL}
            error={errorEmail}
            autoCapitalize={"none"}
            value={email}
            onChange={handleOnChangeEmail}
            onBlur={handleOnBlurEmail}
            onFocus={handleOnFocusEmail}
            keyboardType="email-address"
            containerStyle={{ paddingVertical: sh4 }}
          />
          {name === undefined ? null : (
            <CustomTextInput
              label={FORM.NAME_LABEL}
              onChange={handleOnChangeName}
              onBlur={handleOnBlurName}
              error={errorName}
              onFocus={handleOnFocusName}
              value={name}
              labelHolder={FORM.NAME_PLACEHOLDER}
              containerStyle={{ paddingVertical: sh4 }}
            />
          )}

          <CustomTextInput
            autoCapitalize="none"
            containerStyle={{ paddingVertical: sh4 }}
            error={errorPassword}
            label={FORM.PASSWORDS_LABEL}
            labelHolder={FORM.PASSWORD_PLACEHOLDER}
            onBlur={handleOnBlurPassword}
            onChange={handleOnChangePassword}
            onFocus={handleOnFocusPassword}
            secureTextEntry={visibility}
            setVisible={setSecureText}
            value={password}
            visibilityText={visibility}
          />
          <View style={{ paddingVertical: sh16 }}>
            {name !== undefined ? null : (
              <Pressable disabled={loading} onPress={openModal}>
                <View style={{ ...alignItemsEnd, paddingRight: sw8 }}>
                  <Text style={fs12BoldGray1}>{FORM.FORGOT_PASSWORD_LABEL}</Text>
                </View>
              </Pressable>
            )}
          </View>
          <Fragment>
            <View style={alignSelfCenter}>
              <CustomButton
                onPress={handleNextPage}
                withDebounce={true}
                text={continueLabel}
                buttonStyle={{ borderRadius: sw16 }}
                textStyle={fsAlignCenter}
                disabled={disableContinue || loading === true}
                loading={loading}
              />
            </View>
            <CustomSpacer space={sh4} />
            {subContent}
          </Fragment>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

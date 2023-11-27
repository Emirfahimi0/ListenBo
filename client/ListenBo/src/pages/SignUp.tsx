import React, { Fragment, FunctionComponent, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerHorizontal,
  colorJet,
  colorRose,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldGray1,
  fs12RegRose2,
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
} from "../styles";
import { LANGUAGE } from "../constants";
import { CustomButton, CustomSpacer, CustomTextInput } from "../components";
import { Icon } from "../components/Icons/";
import { isPasswordValid, isValidEmail } from "../utils";
const { WELCOME_PAGE, FORM_LABEL } = LANGUAGE;

export const SignUp: FunctionComponent = () => {
  const [signUp, setSignUp] = useState<ISignUpForm>({
    email: "",
    name: "",
    password: "",
    errorEmail: undefined,
    errorName: undefined,
    errorPassword: undefined,
  });
  const { email, name, password, errorEmail, errorName, errorPassword } = signUp;
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [visibility, setVisiblity] = useState<boolean | undefined>(undefined);

  const handleOnChangeEmail = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setSignUp({ ...signUp, ...{ email: event.nativeEvent.text } });
  };

  const handleOnChangeName = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setSignUp({ ...signUp, ...{ name: event.nativeEvent.text } });
  };

  const handleOnChangePassword = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setVisiblity(true);
    setSignUp({ ...signUp, ...{ password: event.nativeEvent.text } });
  };

  const handleOnBlurEmail = () => {
    let error = "";
    const { email } = signUp;
    if (email === "") {
      error = FORM_LABEL.EMAIL_ADDRESS_EMPTY;
      return setSignUp({ ...signUp, ...{ errorEmail: error } });
    }

    if (isValidEmail(email) === false) {
      error = FORM_LABEL.ERROR_INVALID_EMAIL;
      return setSignUp({ ...signUp, ...{ errorEmail: error } });
    }

    return setSignUp({ ...signUp, ...{ errorEmail: undefined } });
  };

  const handleOnBlurName = () => {
    let error = "";
    const { name } = signUp;

    if (name.trim() === "") {
      error = FORM_LABEL.NAME_EMPTY;
      return setSignUp({ ...signUp, ...{ errorName: error } });
    }
    if (name.length < 3) {
      error = FORM_LABEL.NAME_MIN;
      return setSignUp({ ...signUp, ...{ errorName: error } });
    }
    if (name.length > 20) {
      error = FORM_LABEL.NAME_MAX;
      return setSignUp({ ...signUp, ...{ errorName: error } });
    }

    return setSignUp({ ...signUp, ...{ errorName: undefined } });
  };

  const handleOnBlurPassword = () => {
    let error = "";
    const { password } = signUp;

    if (password === "") {
      error = FORM_LABEL.PASSWORD_EMPTY;
      return setSignUp({ ...signUp, ...{ errorPassword: error } });
    }
    if (isPasswordValid(password) === false) {
      error = FORM_LABEL.PASSWORD_INVALID;
      return setSignUp({ ...signUp, ...{ errorPassword: error } });
    }

    return setSignUp({ ...signUp, ...{ errorPassword: undefined } });
  };

  const handleOnFocusEmail = () => {
    setSignUp({ ...signUp, ...{ errorEmail: undefined } });
  };
  const handleOnFocusName = () => {
    setSignUp({ ...signUp, ...{ errorName: undefined } });
  };
  const handleOnFocusPassword = () => {
    setSignUp({ ...signUp, ...{ errorPassword: undefined } });
  };

  const handleSignUp = () => {
    let request: IRequestBody = {
      name: signUp.name,
      email: signUp.email,
      password: signUp.password,
    };
  };

  const setSecureText = () => {
    return setVisiblity(!visibility);
  };
  const disable =
    (signUp.email !== "" && signUp.errorEmail !== undefined) ||
    (signUp.password !== "" && signUp.errorPassword !== undefined) ||
    (signUp.name !== "" && signUp.errorName !== undefined);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={backgroundStyle}>
      <SafeAreaView style={{ paddingVertical: sh10 }}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle}>
            <Icon color={colorWhite._3} name="arrow-left" size={sw16} />
          </TouchableOpacity>
        </View>
        <View style={{ ...flexRow, ...centerHorizontal }}>
          <Image source={require("../assets/images/login.png")} style={{ height: sh152, width: sw152 }} />
        </View>
      </SafeAreaView>
      <View style={borderBottomContainer}>
        <CustomTextInput
          label={FORM_LABEL.EMAIL_ADDRESS_LABEL}
          labelHolder={WELCOME_PAGE.ENTER_EMAIL_LABEL}
          error={errorEmail}
          value={email}
          onChange={handleOnChangeEmail}
          onBlur={handleOnBlurEmail}
          onFocus={handleOnFocusEmail}
          keyboardType="email-address"
          containerStyle={{ paddingVertical: sh4 }}
        />

        <CustomTextInput
          label={FORM_LABEL.NAME_LABEL}
          onChange={handleOnChangeName}
          onBlur={handleOnBlurName}
          error={errorName}
          onFocus={handleOnFocusName}
          value={name}
          labelHolder={FORM_LABEL.NAME_PLACEHOLDER}
          containerStyle={{ paddingVertical: sh4 }}
        />
        <CustomTextInput
          autoCapitalize="none"
          containerStyle={{ paddingVertical: sh4 }}
          error={errorPassword}
          label={FORM_LABEL.PASSWORDS_LABEL}
          labelHolder={FORM_LABEL.PASSWORD_PLACEHOLDER}
          onBlur={handleOnBlurPassword}
          onChange={handleOnChangePassword}
          onFocus={handleOnFocusPassword}
          secureTextEntry={visibility}
          setVisible={setSecureText}
          value={password}
          visibilityText={visibility}
        />
        <Pressable disabled={loading}>
          <View style={{ ...alignItemsEnd, paddingRight: sw8, paddingVertical: sh10 }}>
            <Text style={fs12BoldGray1}>Forgot Password?</Text>
          </View>
        </Pressable>

        <Fragment>
          <View style={alignSelfCenter}>
            <CustomButton
              onPress={handleSignUp}
              withDebounce={true}
              text={WELCOME_PAGE.SIGN_UP_LABEL}
              buttonStyle={{ borderRadius: sw16 }}
              textStyle={fsAlignCenter}
              disabled={disable}
              loading={loading}
            />
          </View>
          <CustomSpacer space={sh4} />
          <View style={{ ...flexRow, ...centerHorizontal }}>
            <Text style={fs12BoldGray1}>{WELCOME_PAGE.ALREADY_HAVE_ACCOUNT_LABEL}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <TouchableOpacity disabled={loading}>
              <Text style={fs12RegRose2}>{WELCOME_PAGE.SIGN_IN_LABEL}</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      </View>
    </KeyboardAvoidingView>
  );
};

const backgroundStyle: ViewStyle = {
  backgroundColor: colorRose._1,
  ...flexChild,
};

const arrowStyle: ViewStyle = {
  backgroundColor: colorJet._4,
  padding: sw12,
  borderTopRightRadius: sw8,
  borderBottomLeftRadius: sw8,
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

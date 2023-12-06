import React, { Fragment, FunctionComponent, useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
} from "react-native";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerHV,
  colorJet,
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
import { CustomButton, CustomSpacer, CustomTextInput, Icon, BottomSheetModalComponent } from "../../components";
import { isPasswordValid, isValidEmail } from "../../utils";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const { WELCOME_PAGE, FORM_LABEL } = LANGUAGE;

export interface IAuthFormTemplatesProps {
  authForm: ISignUpForm;
  continueLabel: string;
  disableContinue: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  loading?: boolean;
  setValue: (value: ISignUpForm) => void;
  subContent: JSX.Element;
}

export const AuthFormTemplates: FunctionComponent<IAuthFormTemplatesProps> = ({
  handlePreviousPage,
  authForm,
  continueLabel,
  disableContinue,
  handleNextPage,
  loading,
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
      error = FORM_LABEL.EMAIL_ADDRESS_EMPTY;
      return setValue({ ...authForm, ...{ errorEmail: error } });
    }

    if (isValidEmail(email) === false) {
      error = FORM_LABEL.ERROR_INVALID_EMAIL;
      return setValue({ ...authForm, ...{ errorEmail: error } });
    }

    return setValue({ ...authForm, ...{ errorEmail: undefined } });
  };

  const handleOnBlurName = () => {
    let error = "";

    if (name === undefined) return;

    if (name.trim() === "") {
      error = FORM_LABEL.NAME_EMPTY;
      return setValue({ ...authForm, ...{ errorName: error } });
    }
    if (name.length < 3) {
      error = FORM_LABEL.NAME_MIN;
      return setValue({ ...authForm, ...{ errorName: error } });
    }
    if (name.length > 20) {
      error = FORM_LABEL.NAME_MAX;
      return setValue({ ...authForm, ...{ errorName: error } });
    }

    return setValue({ ...authForm, ...{ errorName: undefined } });
  };

  const handleOnBlurPassword = () => {
    let error = "";

    if (password === "") {
      error = FORM_LABEL.PASSWORD_EMPTY;
      return setValue({ ...authForm, ...{ errorPassword: error } });
    }
    if (isPasswordValid(password) === false) {
      error = FORM_LABEL.PASSWORD_INVALID;
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={backgroundStyle}>
      <SafeAreaView style={{ paddingVertical: sh10 }}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle} onPress={handlePreviousPage}>
            <Icon color={colorWhite._3} name="arrow-left" size={sw16} />
          </TouchableOpacity>
        </View>

        <View style={centerHV}>
          <Image source={require("../../assets/images/login.png")} style={{ height: sh152, width: sw152 }} />
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
        {name === undefined ? null : (
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
        )}

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
        <View style={{ paddingVertical: sh16 }}>
          {name !== undefined ? null : (
            <Pressable disabled={loading} onPress={showModal}>
              <View style={{ ...alignItemsEnd, paddingRight: sw8 }}>
                <Text style={fs12BoldGray1}>{FORM_LABEL.FORGOT_PASSWORD_LABEL}</Text>
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
              disabled={disableContinue}
              loading={loading}
            />
          </View>
          <CustomSpacer space={sh4} />
          {subContent}
        </Fragment>
      </View>
      <BottomSheetModalComponent bottomSheetModalRef={bottomSheetModalRef} hideModal={hideModal} />
    </View>
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

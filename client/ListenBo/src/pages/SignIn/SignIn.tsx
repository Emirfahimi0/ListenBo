import { Alert } from "react-native";
import { AuthFormTemplates } from "../../templates";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalComponent, LabelLink } from "../../components";
import { globalState } from "../../store/global";
import { forgotPassword, logIn } from "../../network";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, FunctionComponent, useCallback, useRef, useState } from "react";

import { LANGUAGE } from "../../constants";
import { updateProfile } from "../../store/auth";
export interface ISignInProps {
  navigation: IStackNavigationProp;
}
const { FORM } = LANGUAGE;

export const SignIn: FunctionComponent<ISignInProps> = ({ navigation }: ISignInProps) => {
  const [signIn, setSignIn] = useState<ISignUpForm>({
    email: "",
    password: "",
    errorEmail: undefined,
    errorPassword: undefined,
  });
  const { email, password, errorEmail, errorPassword } = signIn;
  const [currentStep, setCurrentStep] = useState<CurrentContentModal | undefined>("RecoverEmail");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const dispatch = useDispatch();

  // const countDown = useSelector(globalState).countDown;
  const currentContent = useSelector(globalState).currentContent;

  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await logIn({ email, password });
      if (response.code === "error") {
        const { data } = response.error as any;

        return Alert.alert(`Error occurred: ${data.error}`);
      }

      if (response.code === "success" && response.data !== null) {
        const { profile } = response.data;
        dispatch(updateProfile(profile));
        // navigate to dashboard -> private routes
      } else {
        return Alert.alert("Unexpected response from the server");
      }
    } catch (error) {
      return Alert.alert(`unknown error occurred ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    navigation.goBack();
  };

  const handleDifferentForm = () => {
    navigation.replace("SignUp");
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await forgotPassword({ email });

      if (response.code === "error") {
        const { data } = response.error as any;
        return Alert.alert(`Error occurred while checking on your account,${data.error}`);
      }
      if (response.code === "success" && response.data !== null) {
        const message = response.data.message;
        return Alert.alert(message!);
      } else {
        return Alert.alert("Unexpected response from the server");
      }
    } catch (error) {
      return Alert.alert(`unknown error occurred ${error}`);
    }
  };

  const appLink: JSX.Element = (
    <LabelLink
      disabledLink={false}
      subLink={true}
      label={FORM.NO_ACCOUNT_LABEL}
      subLabel={FORM.SIGN_UP_LABEL}
      centerPosition={true}
      onPressAction={handleDifferentForm}
    />
  );

  const disableContinue = email === "" || errorEmail !== undefined || password === "" || errorPassword !== undefined;

  return (
    <Fragment>
      <AuthFormTemplates
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleSignIn}
        disableContinue={disableContinue}
        setValue={setSignIn}
        authForm={signIn}
        loading={loading}
        continueLabel={FORM.SIGN_IN_LABEL}
        subContent={appLink}
        showModal={showModal}
      />
      <BottomSheetModalComponent
        bottomSheetModalRef={bottomSheetModalRef}
        hideModal={hideModal}
        currentStep={currentStep}
        currentContent={currentContent}
        handleRecoveryEmail={handleForgotPassword}
        setCurrentStep={setCurrentStep}
      />
    </Fragment>
  );
};

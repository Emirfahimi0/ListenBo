import React, { Fragment, FunctionComponent, useCallback, useRef, useState } from "react";

import { LANGUAGE } from "../../constants";
import { BottomSheetModalComponent, LabelLink } from "../../components";

import { AuthFormTemplates } from "../../templates";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

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
  const [currentStep, setCurrentStep] = useState<CurrentContentModal | undefined>("recoverEmail");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSignIn = () => {
    let request: IUserNetwork.IRequestCreateAccount = {
      email: email,
      password: password,
    };
    console.log(request);
  };

  const handlePreviousPage = () => {
    navigation.goBack();
  };

  const handleRecoveryEmail = () => {
    setCurrentStep("OTPEvent");
  };

  const disable = email === "" || errorEmail !== undefined || password === "" || errorPassword !== undefined;

  const appLink: JSX.Element = (
    <LabelLink
      disabledLink={false}
      subLink={true}
      label={FORM.NO_ACCOUNT_LABEL}
      subLabel={FORM.SIGN_UP_LABEL}
      centerPosition={true}
      onPressAction={() => navigation.push("SignUp")}
    />
  );

  const handleVerificationEvent = () => {};

  return (
    <Fragment>
      <AuthFormTemplates
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleSignIn}
        disableContinue={disable}
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
        handleRecoveryEmail={handleRecoveryEmail}
        handleVerificationEvent={handleVerificationEvent}
        setCurrentStep={setCurrentStep}
      />
    </Fragment>
  );
};

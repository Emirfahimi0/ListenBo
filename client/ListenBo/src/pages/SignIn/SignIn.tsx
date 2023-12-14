import React, { Fragment, FunctionComponent, useState } from "react";

import { LANGUAGE } from "../../constants";
import { LabelLink, RecoveryEmailForm } from "../../components";
import { sh32, sh4 } from "../../styles";
import { View } from "react-native";
import { AuthFormTemplates } from "../../templates";
import { VerificationEvent } from "../VerificationEvent";

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
  const [recoveryEmail, setRecoveryEmail] = useState<IUserNetwork.IRecoverEmail>({ email: "" });
  const [currentStep, setCurrentStep] = useState<CurrentContentModal | undefined>("recoverEmail");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  let content: JSX.Element = <View />;

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
  console.log(currentStep);

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

  if (currentStep === "recoverEmail")
    content = (
      <RecoveryEmailForm
        title={FORM.FORGET_PASSWORD_LABEL}
        label={FORM.FORGET_PASSWORD_SUB_LABEL}
        spaceToTop={sh4}
        setRecoveryEmail={setRecoveryEmail}
        prefixStyle={{ paddingVertical: sh32 }}
        recoveryEmail={recoveryEmail}
        handleRecoveryEmail={handleRecoveryEmail}
      />
    );

  if (currentStep === "OTPEvent") content = <VerificationEvent />;

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
        modalContent={content}
      />
    </Fragment>
  );
};

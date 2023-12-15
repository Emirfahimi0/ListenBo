import React, { Fragment, FunctionComponent, useCallback, useRef, useState } from "react";
import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { BottomSheetModalComponent, LabelLink } from "../components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export interface ISignUpProps {
  navigation: IStackNavigationProp;
}

const { FORM, WELCOME_PAGE } = LANGUAGE;

export const SignUp: FunctionComponent<ISignUpProps> = ({ navigation }: ISignUpProps) => {
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
  const [currentStep, setCurrentStep] = useState<CurrentContentModal | undefined>("OTPEvent");
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSignUp = () => {
    let request: IUserNetwork.IRequestCreateAccount = {
      name: signUp.name,
      email: signUp.email,
      password: signUp.password,
    };

    console.log(request);
    showModal();
    // send server here
    setLoading(true);
  };

  const handlePreviousPage = () => {
    navigation.goBack();
  };

  const disable =
    email === "" || errorEmail !== undefined || name === "" || errorName !== undefined || password === "" || errorPassword !== undefined;

  const appLink = (
    <LabelLink
      disabledLink={true}
      subLink={true}
      label={WELCOME_PAGE.ALREADY_HAVE_ACCOUNT_LABEL}
      subLabel={FORM.SIGN_IN_LABEL}
      centerPosition={true}
      onPressAction={() => {}}
    />
  );

  const handleVerificationEvent = () => {
    console.log("varification");
  };

  return (
    <Fragment>
      <AuthFormTemplates
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleSignUp}
        disableContinue={disable}
        setValue={setSignUp}
        authForm={signUp}
        loading={loading}
        continueLabel={FORM.SIGN_UP_LABEL}
        subContent={appLink}
      />
      <BottomSheetModalComponent
        bottomSheetModalRef={bottomSheetModalRef}
        hideModal={hideModal}
        handleVerificationEvent={handleVerificationEvent}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </Fragment>
  );
};

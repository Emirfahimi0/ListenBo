import React, { Fragment, FunctionComponent, useRef, useState } from "react";

import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { LabelLink } from "../components";
import { VerificationEvent } from "./VerificationEvent";

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

  const modalRef = useRef<IModalRef | null>(null);

  const handleSignUp = () => {
    let request: IUserNetwork.IRequestCreateAccount = {
      name: signUp.name,
      email: signUp.email,
      password: signUp.password,
    };

    console.log(request);
    modalRef.current!.showModal();
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

  const handleVerification = () => {
    console.log("varification");
  };

  let content: JSX.Element = <VerificationEvent handleOtpEvent={handleVerification} />;

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
        modalContent={content}
        ref={modalRef}
      />
    </Fragment>
  );
};

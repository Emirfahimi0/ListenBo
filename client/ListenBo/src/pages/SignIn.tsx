import React, { Fragment, FunctionComponent, useState } from "react";

import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { LabelLink, RecoveryEmail } from "../components";
import { sh4, sh50 } from "../styles";

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
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const handleSignIn = () => {
    let request: IRequestBody = {
      email: email,
      password: password,
    };
    console.log(request);
  };

  const handlePreviousPage = () => {
    navigation.goBack();
  };

  const disable = email === "" || errorEmail !== undefined || password === "" || errorPassword !== undefined;

  const appLink: JSX.Element = (
    <LabelLink disabledLink={false} subLink={true} label={FORM.NO_ACCOUNT_LABEL} subLabel={FORM.SIGN_UP_LABEL} onPressAction={() => {}} />
  );

  const modalContent: JSX.Element = (
    <RecoveryEmail
      label={FORM.FORGET_PASSWORD_LABEL}
      title={FORM.FORGET_PASSWORD_SUB_LABEL}
      spaceToTop={sh4}
      prefixStyle={{ paddingVertical: sh50 }}
    />
  );

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
        modalContent={modalContent}
      />
    </Fragment>
  );
};

import React, { Fragment, FunctionComponent, useState } from "react";

import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { LabelLink } from "../components";

export interface ISignInProps {
  navigation: IStackNavigationProp;
}
const { FORM_LABEL } = LANGUAGE;

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

  const appLink = (
    <LabelLink
      disabledLink={false}
      subLink={true}
      label={FORM_LABEL.NO_ACCOUNT_LABEL}
      subLabel={FORM_LABEL.SIGN_UP_LABEL}
      onPressAction={() => {}}
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
        continueLabel={FORM_LABEL.SIGN_IN_LABEL}
        subContent={appLink}
      />
    </Fragment>
  );
};

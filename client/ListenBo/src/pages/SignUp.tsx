import React, { Fragment, FunctionComponent, useState } from "react";

import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { LabelLink } from "../components";

export interface ISignUpProps {
  navigation: IStackNavigationProp;
}

const { FORM_LABEL, WELCOME_PAGE } = LANGUAGE;

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

  const handleSignUp = () => {
    let request: IRequestBody = {
      name: signUp.name,
      email: signUp.email,
      password: signUp.password,
    };

    console.log(request);
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
      subLabel={FORM_LABEL.SIGN_IN_LABEL}
      onPressAction={() => {}}
    />
  );

  return (
    <Fragment>
      <AuthFormTemplates
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleSignUp}
        disableContinue={disable}
        setValue={setSignUp}
        authForm={signUp}
        loading={loading}
        continueLabel={FORM_LABEL.SIGN_UP_LABEL}
        subContent={appLink}
      />
    </Fragment>
  );
};

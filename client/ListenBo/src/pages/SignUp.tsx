import React, { Fragment, FunctionComponent, useCallback, useRef, useState } from "react";
import { AuthFormTemplates } from "../templates";
import { LANGUAGE } from "../constants";
import { BottomSheetModalComponent, LabelLink } from "../components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createAccount, reVerifyAccountByEmail, verifyAccountByEmail } from "../network";
import { Alert } from "react-native";
import { newUserFormatter } from "../utils";

export interface ISignUpProps {
  navigation: IStackNavigationProp;
}

const { FORM, WELCOME_PAGE } = LANGUAGE;

export const SignUp: FunctionComponent<ISignUpProps> = ({ navigation }: ISignUpProps) => {
  const [signUp, setSignUp] = useState<ISignUpForm>({
    email: "",
    errorEmail: undefined,
    errorName: undefined,
    errorPassword: undefined,
    name: "",
    password: "",
  });
  const { email, name, password, errorEmail, errorName, errorPassword } = signUp;
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState<CurrentContentModal | undefined>("OTPEvent");
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const newUserRef = useRef<newUser | null>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSignUp = async () => {
    try {
      const response = await createAccount({ name, password, email });

      if (response.code === "error") {
        const { data } = response.error as any;
        return Alert.alert(` ${data.error}`);
      }

      if (response.code === "success" && response.data !== null) {
        const { newUser } = response.data;
        const createdUser = newUserFormatter(newUser!);
        newUserRef.current = createdUser!;
        showModal();
        console.log("newUser", createdUser);
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

  const handleVerificationEvent = async (token: string) => {
    console.log("token", token);
    try {
      if (newUserRef === null) return;
      const userId = newUserRef.current!.userId;
      const response = await verifyAccountByEmail({ token, userId });
      console.log(response);
      if (response.code === "success") {
        return response.data.success! == null;
      }
      if (response.code === "error") {
        const errorFromServer = response.error as any;
        Alert.alert(`verfication failed ,${errorFromServer.status} `);
        return false;
      }
    } catch (error) {
      Alert.alert(`unexpected error ${error}`);
      return false;
    }
    return undefined;
  };

  const handleReVerficationEvent = useCallback(async () => {
    try {
      if (newUserRef === null) return;
      const userId = newUserRef.current!.userId;
      const response = await reVerifyAccountByEmail({ userId });
      console.log(response);
      if (response.code === "success") {
        console.log(response.data);
      }
      if (response.code === "error") {
        const errorFromServer = response.error as any;
        return Alert.alert(`verfication failed ,${errorFromServer.status} `);
      }
    } catch (error) {
      return Alert.alert(`unexpected error ${error}`);
    }
  }, []);

  const handleDifferentForm = () => {
    navigation.replace("SignIn");
  };

  const appLink = (
    <LabelLink
      disabledLink={true}
      subLink={true}
      label={WELCOME_PAGE.ALREADY_HAVE_ACCOUNT_LABEL}
      subLabel={FORM.SIGN_IN_LABEL}
      centerPosition={true}
      onPressAction={handleDifferentForm}
    />
  );

  const disableContinue =
    email === "" || errorEmail !== undefined || name === "" || errorName !== undefined || password === "" || errorPassword !== undefined;

  return (
    <Fragment>
      <AuthFormTemplates
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleSignUp}
        disableContinue={disableContinue}
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
        handleReVerified={handleReVerficationEvent}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </Fragment>
  );
};

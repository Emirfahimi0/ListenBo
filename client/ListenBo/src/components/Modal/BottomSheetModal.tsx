import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { FunctionComponent, RefObject, useCallback, useMemo, useState } from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import {
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  justifyContentStart,
  sh32,
  sh4,
  sw16,
  sw24,
  sw40,
  sw8,
} from "../../styles";
import { Icon } from "../Icons";
import { RecoveryEmailForm } from "../View";
import { LANGUAGE } from "../../constants";
import { VerificationEvent } from "../../pages/VerificationEvent";
import { updateCurrentContent } from "../../store/global";

const { FORM } = LANGUAGE;

interface IBottomSheetModalComponentProps {
  bottomSheetModalRef: RefObject<TBottomModalSheetProps>;
  currentContent?: CurrentContentModal[];
  currentStep: CurrentContentModal | undefined;
  handleRecoveryEmail?: (email: string) => void;
  handleReVerified?: (userId: string) => void;
  handleVerificationEvent?: (token: string) => void;
  hideModal: () => void;
  setCurrentStep: (value: CurrentContentModal | undefined) => void;
}

export const BottomSheetModalComponent: FunctionComponent<IBottomSheetModalComponentProps> = ({
  bottomSheetModalRef,
  hideModal,
  handleRecoveryEmail,
  handleReVerified,
  handleVerificationEvent,
  setCurrentStep,
  currentContent,
  currentStep,
}: IBottomSheetModalComponentProps) => {
  const [recoveryEmail, setRecoveryEmail] = useState<IUserNetwork.IRecoverEmail>({ email: "" });
  const { email } = recoveryEmail;

  let content: JSX.Element = <View />;

  const handleForgotPassword = () => {
    if (handleRecoveryEmail) {
      handleRecoveryEmail(email);
    }
  };

  const snapPoints = useMemo(() => {
    if (Platform.OS === "ios") {
      return ["93%"];
    } else {
      return ["60%"];
    }
  }, []);

  const renderBackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} pressBehavior="none" />
    ),
    [],
  );

  const closeModal = () => {
    if (currentContent === undefined) return;
    if (currentContent.length === 1 && currentContent[1] === "OTPEvent") {
      updateCurrentContent(["RecoverEmail"]);
      setCurrentStep("RecoverEmail");
    } else {
      updateCurrentContent([]);
      setCurrentStep(undefined);
      hideModal();
    }
  };

  if (currentStep === "RecoverEmail")
    content = (
      <RecoveryEmailForm
        title={FORM.FORGET_PASSWORD_LABEL}
        label={FORM.FORGET_PASSWORD_SUB_LABEL}
        spaceToTop={sh4}
        setRecoveryEmail={setRecoveryEmail}
        prefixStyle={{ paddingVertical: sh32 }}
        recoveryEmail={recoveryEmail}
        handleRecoveryEmail={handleForgotPassword}
      />
    );

  if (currentStep === "OTPEvent" && handleVerificationEvent !== undefined && handleReVerified !== undefined)
    content = <VerificationEvent handleOtpEvent={handleVerificationEvent} handleReVerfication={handleReVerified} />;

  return (
    <BottomSheetModal
      backgroundStyle={backgroundStyle}
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      backdropComponent={renderBackDrop}
      handleComponent={() => {
        return <View />;
      }}
      enablePanDownToClose={false}>
      <View style={modalStyle}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle} onPress={closeModal}>
            <Icon color={colorGray._1} name="close-circle" size={sw24} />
          </TouchableOpacity>
        </View>
        {content}
      </View>
    </BottomSheetModal>
  );
};

const backgroundStyle: ViewStyle = {
  borderRadius: 0,
  backgroundColor: colorTransparent,
};

const modalStyle: ViewStyle = {
  borderTopLeftRadius: sw40,
  borderTopRightRadius: sw40,
  backgroundColor: colorWhite._1,
  ...flexChild,
};

const arrowStyle: ViewStyle = {
  padding: sw16,
  borderTopRightRadius: sw8,
  borderBottomLeftRadius: sw8,
};

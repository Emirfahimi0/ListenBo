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

const { FORM } = LANGUAGE;

interface IBottomSheetModalComponentProps {
  bottomSheetModalRef: RefObject<TBottomModalSheetProps>;
  currentStep: string | undefined;
  handleRecoveryEmail?: () => void;
  handleVerificationEvent: () => void;
  hideModal: () => void;
  setCurrentStep: (value: CurrentContentModal) => void;
}

export const BottomSheetModalComponent: FunctionComponent<IBottomSheetModalComponentProps> = ({
  bottomSheetModalRef,
  hideModal,
  handleRecoveryEmail,
  handleVerificationEvent,
  setCurrentStep,
  currentStep,
}: IBottomSheetModalComponentProps) => {
  const [recoveryEmail, setRecoveryEmail] = useState<IUserNetwork.IRecoverEmail>({ email: "" });

  let content: JSX.Element = <View />;

  if (currentStep === "recoverEmail")
    content = (
      <RecoveryEmailForm
        title={FORM.FORGET_PASSWORD_LABEL}
        label={FORM.FORGET_PASSWORD_SUB_LABEL}
        spaceToTop={sh4}
        setRecoveryEmail={setRecoveryEmail}
        prefixStyle={{ paddingVertical: sh32 }}
        recoveryEmail={recoveryEmail}
        handleRecoveryEmail={handleRecoveryEmail!}
      />
    );

  if (currentStep === "OTPEvent") content = <VerificationEvent handleOtpEvent={handleVerificationEvent} />;

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
          <TouchableOpacity style={arrowStyle} onPress={hideModal}>
            <Icon color={colorGray._1} name="arrow-back-circle" size={sw24} />
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

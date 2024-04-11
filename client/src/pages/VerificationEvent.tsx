import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, TextStyle, View } from "react-native";
import {
  centerHV,
  colorBlack,
  colorGreen,
  colorRose,
  flexChild,
  flexRow,
  flexRowSbSb,
  fs10BoldRose1,
  fs12BoldGray1,
  fs12BoldOrange2,
  fs12BoldOrange3,
  fs12RegJett2,
  fs16BoldBlack1,
  fs16BoldGray1,
  fs18BoldOrange1,
  fsAlignCenter,
  sh12,
  sh16,
  sh4,
  sh64,
  sw10,
  sw16,
  sw2,
  sw20,
  sw4,
  sw64,
  sw8,
} from "../styles";
import { LANGUAGE } from "../constants";
import { CustomSpacer, Icon, LabelLink, Loading } from "../components";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { CircleSnail } from "react-native-progress";
import { useCountDown } from "../hooks";

const { VERIFICATION_EVENT } = LANGUAGE;

interface IVerificationEventProps {
  handleOtpEvent: (token: string) => boolean | void;
  handleReVerfication: (userId: string) => void;
}

const initialValue: IOTPCode = {
  code: "",
  error: undefined,
  isSuccess: false,
};

export const VerificationEvent: FunctionComponent<IVerificationEventProps> = ({
  handleOtpEvent,
  handleReVerfication,
}: IVerificationEventProps) => {
  const [otpCode, setOtpCode] = useState<IOTPCode>(initialValue);
  const initialCountDown = 10;
  const { seconds, startCountDown } = useCountDown(initialCountDown);
  const { code, error, isSuccess } = otpCode;

  const handleOnCodeFilled = async (value: string) => {
    const isVerified = handleOtpEvent(value);
    return setOtpCode({ ...otpCode, code: value, isSuccess: isVerified === undefined ? false : isVerified });
  };

  // use onCodeChanged of the module, every-time the code.length === 1 remove error styles.

  const handleResendCode = async () => {
    if (seconds === 0) {
      startCountDown(initialCountDown);
    }
    handleReVerfication(code!);
    return setOtpCode(initialValue);
  };

  const handleOnCodeChange = (value: string) => {
    setOtpCode({ ...otpCode, code: value });
    // if (code.length === 1) {
    //   setOtpCode()
    // }
  };

  useEffect(() => {
    if (isSuccess === true) {
      return console.log("true");
    }
  }, [isSuccess]);

  const defaultInputStyle: TextStyle = {
    borderRadius: sw10,
    borderWidth: sw2,
    backgroundColor: "#F6F4F4",
    borderColor: error !== undefined ? colorRose._1 : colorBlack._1,
    ...fsAlignCenter,
    ...fs18BoldOrange1,
  };

  return (
    <Fragment>
      <View style={{ ...flexChild, paddingHorizontal: sw20 }}>
        {isSuccess === true ? (
          <View style={{ ...flexChild, ...centerHV }}>
            <Text style={fs16BoldGray1}>{VERIFICATION_EVENT.VERIFYING_EMAIL}</Text>
            <CustomSpacer space={sh12} />
            <CircleSnail color={colorGreen._1} size={sw64} thickness={sw4} animating={true} />
          </View>
        ) : (
          <Fragment>
            <View style={{ paddingVertical: sh16 }}>
              <Text style={fs16BoldBlack1}>{VERIFICATION_EVENT.OTP_TITLE}</Text>
              <Text style={fs12RegJett2}>{VERIFICATION_EVENT.OTP_SUB_TITLE}</Text>
            </View>
            <View style={{ height: sh64 }}>
              <OTPInputView
                autoFocusOnLoad={true}
                code={code}
                clearInputs={code === undefined}
                codeInputFieldStyle={defaultInputStyle}
                codeInputHighlightStyle={{ borderColor: colorGreen._1 }}
                keyboardType="default"
                onCodeChanged={handleOnCodeChange}
                editable={true}
                onCodeFilled={handleOnCodeFilled}
                pinCount={6}
              />
            </View>
            <View style={{ ...flexRow, paddingVertical: sh4 }}>
              {error === undefined ? null : (
                <View style={flexRow}>
                  <Icon color={colorRose._2} name="warning" size={sw16} />
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <Text style={fs10BoldRose1}>{error}</Text>
                </View>
              )}

              {seconds > 0 && error === undefined ? <Loading secondary={false} label={VERIFICATION_EVENT.VERIFYING_EMAIL} /> : null}
            </View>
            <CustomSpacer space={sh12} />
            <View style={flexRowSbSb}>
              <Text style={fs12BoldGray1}>{VERIFICATION_EVENT.RECEIVED_CODE_LABEL}</Text>

              <LabelLink
                disabledLink={false}
                label={VERIFICATION_EVENT.RESEND_CODE_LABEL}
                subLink={false}
                timer={seconds}
                onPressAction={handleResendCode}
                labelStyle={seconds <= 0 ? fs12BoldOrange2 : fs12BoldOrange3}
              />
            </View>
          </Fragment>
        )}
      </View>
    </Fragment>
  );
};

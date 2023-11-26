import React, { Fragment, FunctionComponent } from "react";
import { SafeAreaView, TouchableOpacity, View, ViewStyle, Image, Text, ScrollView } from "react-native";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerHorizontal,
  colorJet,
  colorRose,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldGray1,
  fs12RegRose2,
  fs16BoldWhite1,
  fsAlignCenter,
  justifyContentStart,
  sh10,
  sh152,
  sh16,
  sh4,
  sh8,
  sw12,
  sw152,
  sw16,
  sw20,
  sw4,
  sw44,
  sw8,
} from "../styles";
import { LANGUAGE } from "../constants";
import { CustomButton, CustomSpacer, CustomTextInput } from "../components";
import { Icon } from "../components/Icons/";
const { WELCOME_PAGE, FORM_LABEL } = LANGUAGE;

export const SignUp: FunctionComponent = () => {
  const handleSignIn = () => {
    console.log("first");
  };

  return (
    <View style={backgroundStyle}>
      <SafeAreaView style={{ paddingVertical: sh10 }}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle}>
            <Icon color={colorWhite._3} name="arrow-left" size={sw16} />
          </TouchableOpacity>
        </View>
        <View style={{ ...flexRow, ...centerHorizontal }}>
          <Image source={require("../assets/images/login.png")} style={{ height: sh152, width: sw152 }} />
        </View>
      </SafeAreaView>
      <View style={borderBottomContainer}>
        <CustomTextInput
          label={FORM_LABEL.EMAIL_ADDRESS_LABEL}
          labelHolder={WELCOME_PAGE.ENTER_EMAIL_LABEL}
          error={"Not a valid email address!"}
          containerStyle={{ paddingVertical: sh4 }}
        />
        <CustomTextInput
          label={FORM_LABEL.NAME_LABEL}
          labelHolder={FORM_LABEL.NAME_PLACEHOLDER}
          containerStyle={{ paddingVertical: sh4 }}
          error={"..."}
        />
        <CustomTextInput
          label={FORM_LABEL.PASSWORDS_LABEL}
          labelHolder={FORM_LABEL.PASSWORD_PLACEHOLDER}
          containerStyle={{ paddingVertical: sh4 }}
        />
        <View style={{ ...alignItemsEnd, paddingRight: sw8, paddingVertical: sh10 }}>
          <Text style={fs12BoldGray1}>Forgot Password?</Text>
        </View>
        <Fragment>
          <View style={alignSelfCenter}>
            <CustomButton
              onPress={handleSignIn}
              text={WELCOME_PAGE.SIGN_UP_LABEL}
              buttonStyle={{ borderRadius: sw16 }}
              textStyle={fsAlignCenter}
              disabled={false}
            />
          </View>
          <CustomSpacer space={sh4} />
          <View style={{ ...flexRow, ...centerHorizontal }}>
            <Text style={fs12BoldGray1}>{WELCOME_PAGE.ALREADY_HAVE_ACCOUNT_LABEL}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <TouchableOpacity>
              <Text style={fs12RegRose2}>{WELCOME_PAGE.SIGN_IN_LABEL}</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      </View>
    </View>
  );
};

const backgroundStyle: ViewStyle = {
  backgroundColor: colorRose._1,
  ...flexChild,
};

const arrowStyle: ViewStyle = {
  backgroundColor: colorJet._4,
  padding: sw12,
  borderTopRightRadius: sw8,
  borderBottomLeftRadius: sw8,
  marginLeft: sw4,
  marginTop: sw4,
};

const borderBottomContainer: ViewStyle = {
  ...flexChild,
  backgroundColor: colorWhite._1,
  borderTopLeftRadius: sw44,
  borderTopRightRadius: sw44,
  paddingHorizontal: sw20,
  paddingTop: sh16,
};

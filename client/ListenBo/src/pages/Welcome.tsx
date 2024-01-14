import React, { FunctionComponent } from "react";
import { SafeAreaView, Text, View, ViewStyle, Image, TouchableOpacity } from "react-native";
import {
  centerHorizontal,
  centerVertical,
  colorJet,
  colorRose,
  flexChild,
  flexRow,
  fs16RegRose2,
  fs16RegWhite1,
  fs24BoldWhite1,
  fsAlignCenter,
  sh32,
  sh368,
  sh4,
  spaceAroundVertical,
  sw28,
  sw296,
  sw8,
} from "../styles";
import { LANGUAGE } from "../constants";
import { CustomButton, CustomSpacer } from "../components";
const { WELCOME_PAGE } = LANGUAGE;

interface IWelcomePageProps {
  navigation: IStackNavigationProp;
}

export const WelcomePage: FunctionComponent<IWelcomePageProps> = ({ navigation }: IWelcomePageProps) => {
  return (
    <SafeAreaView style={backgroundSafeArea}>
      <View style={{ ...flexChild, ...spaceAroundVertical, marginVertical: sh32 }}>
        <Text style={{ ...fsAlignCenter, ...fs24BoldWhite1 }}>{WELCOME_PAGE.WELCOME_PAGE_LABEL}</Text>
        <View style={{ ...flexRow, ...centerHorizontal }}>
          <Image source={require("../assets/images/welcome.png")} style={{ height: sh368, width: sw296, resizeMode: "contain" }} />
        </View>
        <View style={{ ...centerVertical, paddingVertical: sh32 }}>
          <CustomButton
            onPress={() => navigation.navigate("SignUp")}
            textStyle={fsAlignCenter}
            buttonStyle={btnStyle}
            text={WELCOME_PAGE.SIGN_UP_LABEL}
          />
        </View>
        <View style={{ ...flexRow, ...centerHorizontal }}>
          <Text style={fs16RegWhite1}>{WELCOME_PAGE.ALREADY_HAVE_ACCOUNT_LABEL}</Text>
          <CustomSpacer isHorizontal={true} space={sw8} />
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={fs16RegRose2}>{WELCOME_PAGE.SIGN_IN_LABEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const backgroundSafeArea: ViewStyle = {
  ...flexChild,
  backgroundColor: colorJet._4,
};

const btnStyle: ViewStyle = {
  paddingVertical: sh4,
  backgroundColor: colorRose._2,
  marginHorizontal: sw28,
  borderRadius: sw8,
};

export default WelcomePage;

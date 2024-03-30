import { ParamListBase } from "@react-navigation/native";

declare global {
  interface INavigationParamsList extends ParamListBase {
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
  }

  interface ITabNavigationParamsList extends ParamListBase {
    Profile: undefined;
    Home: undefined;
    Upload: undefined;
  }

  type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<INavigationParamsList>;
  type ITabNavigationProp = import("@react-navigation/bottom-tabs").BottomTabNavigationProp<ITabNavigationParamsList>;

  type TPageType = "OnBoarding" | "SignUp" | "SignIn" | "Home" | "Upload" | "Profile";
}

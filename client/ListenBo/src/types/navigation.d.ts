import { ParamListBase } from "@react-navigation/native";

declare global {
  interface INavigationParamsList extends ParamListBase {
    SignUp: undefined;
    OnBoarding: undefined;
  }

  type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<INavigationParamsList>;

  type TPageType = "OnBoarding" | "SignUp";
}

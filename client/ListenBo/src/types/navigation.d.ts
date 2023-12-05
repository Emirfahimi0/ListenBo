import { ParamListBase } from "@react-navigation/native";

declare global {
  interface INavigationParamsList extends ParamListBase {
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
  }

  type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<INavigationParamsList>;

  type TPageType = "OnBoarding" | "SignUp" | "SignIn";
}

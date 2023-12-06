import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";
import { SignIn, SignUp, WelcomePage } from "../pages";

const { Screen, Navigator } = createStackNavigator<INavigationParamsList>();

export const PublicRoute: FunctionComponent = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="OnBoarding">
      <Screen name="OnBoarding" component={WelcomePage} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};

import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Upload } from "../pages/DashBoard";

const { Navigator, Screen } = createBottomTabNavigator<ITabNavigationParamsList>();

export const PrivateRoute: FunctionComponent = () => {
  return (
    <Navigator>
      <Screen name={"Home"} component={Home} />
      <Screen name={"Profile"} component={Profile} />
      <Screen name={"Upload"} component={Upload} />
    </Navigator>
  );
};

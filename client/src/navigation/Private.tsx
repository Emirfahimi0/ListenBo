import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Upload } from "../pages/DashBoard";
import {
  absolutePosition,
  colorGreen,
  colorOrange,
  colorOverlay,
  colorWhite,
  overflowHidden,
  sh4,
  sw12,
  sw18,
  sw24,
  sw4,
  sw56,
  sw8,
} from "../styles";
import { Icon, IconProps } from "../components";
import { BlurView } from "@react-native-community/blur";
import { StyleSheet, View, ViewStyle } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator<ITabNavigationParamsList>();

interface ITabScreen {
  name: TPageType;
  component: FunctionComponent;
  IconStyle: IconProps;
}

export const PrivateRoute = () => {
  const screens: ITabScreen[] = [
    { name: "Profile", component: Profile, IconStyle: { name: "people-circle", size: sw18 } },
    { name: "Home", component: Home, IconStyle: { name: "home", size: sw18 } },
    { name: "Upload", component: Upload, IconStyle: { name: "cloud-upload", size: sw18 } },
  ];

  const tabBarLabel = ({ focused }) => {
    return <View style={{ height: sh4, width: sw4, backgroundColor: colorGreen._5, opacity: focused ? 1 : 0, borderRadius: sw8 }} />;
  };

  const tabBarStyle: ViewStyle = {
    ...absolutePosition,
    borderTopLeftRadius: sw18,
    borderTopRightRadius: sw18,
    shadowColor: "rgba(47,68,85,1)",
    shadowRadius: sw12,
    shadowOffset: {
      height: sh4,
      width: 0,
    },
    shadowOpacity: 0.12,
  };

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colorWhite._1,
        tabBarActiveTintColor: colorOrange._2,
        tabBarStyle,
        tabBarBackground: () => {
          return (
            <BlurView
              blurType="regular"
              blurAmount={sw56}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: sw24,
                backgroundColor: colorOverlay,
                ...overflowHidden,
              }}
            />
          );
        },
      }}>
      {screens.map(({ name, component, IconStyle }, index) => (
        <Screen
          key={index}
          name={name}
          component={component}
          options={{
            tabBarLabel,
            tabBarIcon: (props) => <Icon {...props} {...IconStyle} />,
          }}
        />
      ))}
    </Navigator>
  );
};

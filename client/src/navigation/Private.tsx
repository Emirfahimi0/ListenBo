import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Upload } from "../pages/DashBoard";
import { absolutePosition, colorBlue, colorGreen, overflowHidden, sh4, sw10, sw12, sw18, sw24, sw4, sw8 } from "../styles";
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
    { name: "Profile", component: Profile, IconStyle: { name: "icon_end_user_customers", size: sw24, strokeWidth: 10 } },
    { name: "Home", component: Home, IconStyle: { name: "icon_github", size: sw24, strokeWidth: 10 } },
    { name: "Upload", component: Upload, IconStyle: { name: "icon_cloud_dedicated", size: sw24, strokeWidth: 10 } },
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
        tabBarInactiveTintColor: colorBlue._1,
        tabBarActiveTintColor: colorBlue._5,
        tabBarStyle,
        tabBarBackground: () => {
          return (
            <BlurView
              blurType="chromeMaterial"
              blurAmount={sw10}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: sw24,
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

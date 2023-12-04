import { NavigationProp, useNavigation } from "@react-navigation/native";

export const navigate = (screens: TPageType) => {
  return useNavigation<NavigationProp<INavigationParamsList>>().navigate(screens);
};

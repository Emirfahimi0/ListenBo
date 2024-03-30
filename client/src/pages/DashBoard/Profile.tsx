import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProfileProps {}

export const Profile: FunctionComponent<IProfileProps> = ({}: IProfileProps) => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

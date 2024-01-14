import React, { FunctionComponent } from "react";
import { SafeAreaView, Text } from "react-native";

interface IProfileProps {}

export const Profile: FunctionComponent<IProfileProps> = ({}: IProfileProps) => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

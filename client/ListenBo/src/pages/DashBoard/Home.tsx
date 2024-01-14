import React, { FunctionComponent } from "react";
import { SafeAreaView, Text } from "react-native";

interface IHomeProps {}

export const Home: FunctionComponent<IHomeProps> = ({}: IHomeProps) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

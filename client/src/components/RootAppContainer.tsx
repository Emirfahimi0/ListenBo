import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { SafeAreaView } from "react-native";
import { colorWhite } from "../styles";

interface RootAppContainerProps {
  children: ReactNode;
}

export const RootAppContainer: FunctionComponent<RootAppContainerProps> = ({ children }: RootAppContainerProps) => {
  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: colorWhite._2 }} />
      {children}
    </Fragment>
  );
};

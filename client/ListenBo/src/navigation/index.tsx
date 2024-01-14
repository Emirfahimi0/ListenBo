import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, FunctionComponent } from "react";
import { PublicRoute } from "./Public";
import { useSelector } from "react-redux";
import { authState } from "../store/auth";
import { PrivateRoute } from "./Private";

export const MainRoutes: FunctionComponent = () => {
  const { isLoggedIn } = useSelector(authState);
  return (
    <NavigationContainer>
      <Fragment>{isLoggedIn === true ? <PrivateRoute /> : <PublicRoute />}</Fragment>
    </NavigationContainer>
  );
};

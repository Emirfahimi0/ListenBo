import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect } from "react";
import { PublicRoute } from "./Public";
import { useSelector } from "react-redux";
import { authState } from "../store/auth";
import { PrivateRoute } from "./Private";
import { authorizedUser } from "../network";
import { KEYS, getStorage } from "../utils";

export const MainRoutes: FunctionComponent = () => {
  const { isLoggedIn } = useSelector(authState);

  const handleFetchInfo = async () => {
    try {
      const token = await getStorage(KEYS.AUTH_TOKEN);

      if (token === null) return;

      const data = await authorizedUser({ token });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchInfo();
  }, []);

  return (
    <NavigationContainer>
      <Fragment>{isLoggedIn === true ? <PrivateRoute /> : <PublicRoute />}</Fragment>
    </NavigationContainer>
  );
};

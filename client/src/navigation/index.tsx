import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect } from "react";
import { PublicRoute } from "./Public";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "./Private";
import { authorizedUser } from "../network";
import { KEYS, getStorage } from "../utils";
import { AppDispatch } from "../store";
import { authState, updateLoggedIn, updateProfile, updateBusyState } from "../store/auth";
import { Loading } from "../components";
import { StyleSheet, View } from "react-native";
import { centerHV, colorTransparent, colorWhite, sw24, zIndexTop } from "../styles";

export const MainRoutes: FunctionComponent = () => {
  const { isLoggedIn, isBusy } = useSelector(authState);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchInfo = async () => {
    dispatch(updateBusyState(true));
    try {
      const token = await getStorage(KEYS.AUTH_TOKEN);

      if (token === null) {
        return;
      }

      const data = await authorizedUser({ token });
      console.log(data);

      if (data.code === "error") {
        return;
      }

      if (data.code === "success" && data.data) {
        dispatch(updateProfile(data.data));
        dispatch(updateBusyState(false));
        dispatch(updateLoggedIn(true));
      }
    } catch (error) {
      console.log(error);
    }
    return dispatch(updateBusyState(false));
  };

  useEffect(() => {
    handleFetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorWhite._2,
    },
  };

  return (
    <NavigationContainer theme={AppTheme}>
      {isBusy === true ? (
        <View style={{ ...StyleSheet.absoluteFillObject, ...centerHV, backgroundColor: colorTransparent, ...zIndexTop }}>
          <Loading secondary={true} size={sw24} />
        </View>
      ) : null}
      <Fragment>{isLoggedIn === true ? <PrivateRoute /> : <PublicRoute />}</Fragment>
    </NavigationContainer>
  );
};

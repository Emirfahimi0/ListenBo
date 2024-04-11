import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { flexChild } from "./styles";
import { Provider } from "react-redux";
import { store } from "./store";
import { MainRoutes } from "./navigation";

export const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={flexChild}>
        <BottomSheetModalProvider>
          <MainRoutes />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

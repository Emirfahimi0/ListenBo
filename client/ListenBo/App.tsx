import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { flexChild } from "./src/styles";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { MainRoutes } from "./src/navigation";

const App = () => {
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

export default App;

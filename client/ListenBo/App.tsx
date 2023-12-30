import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoute } from "./src/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { flexChild } from "./src/styles";
import { Provider } from "react-redux";
import { store } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={flexChild}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <PublicRoute />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

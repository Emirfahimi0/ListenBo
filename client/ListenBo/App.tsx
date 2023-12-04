import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoute } from "./src/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { flexChild } from "./src/styles";

const App = () => {
  return (
    <GestureHandlerRootView style={flexChild}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <PublicRoute />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

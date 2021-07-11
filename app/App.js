import React from 'react';
import { Provider as PaperProvider , DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { LogBox } from 'react-native';
import { NavigationContainer,  DefaultTheme as NavigationDefaultTheme,} from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

//import testing screen here
import {AuthScreenStack, DashboardScreenTab, MainScreenStack, RootScreenStack} from "./src/navigation"
import TestScreen from "./src/screen/SetupScreen"
import LoadingScreen from './src/screen/LoadingScreen';

import colorConstant from './src/constant/color';
import storeConfig from "./store/configureStore";


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: colorConstant.primary,
    accent:  colorConstant.accent,
    background: colorConstant.background,
    card: colorConstant.card,
    text: colorConstant.text,
  },
};

const { store, persistor } = storeConfig();
// Android problem with Firebase JS SDK, cannot be fixed
LogBox.ignoreLogs(["Setting a timer for a long period of"]);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            {/* <RootScreenStack/> */}
            <MainScreenStack/>
            {/* <TestScreen/> */}
            <FlashMessage position="top" />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
import React from 'react';
import { Provider as PaperProvider ,DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme,} from "@react-navigation/native";


import {AuthScreenStack, MainScreenTab} from "./src/navigation"
import TestScreen from "./src/screen/SettingScreen"


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        {/* <AuthScreenStack/> */}
        <TestScreen/>
      </NavigationContainer>
    </PaperProvider>
  );
}

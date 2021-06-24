import React from 'react';
import { Provider as PaperProvider , DefaultTheme as PaperDefaultTheme } from "react-native-paper";

import { NavigationContainer,  DefaultTheme as NavigationDefaultTheme,} from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

//import testing screen here
import {AuthScreenStack, DashboardScreenTab, MainScreenStack} from "./src/navigation"
import TestScreen from "./src/screen/AddTripScreen"



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
            <MainScreenStack/>
            <FlashMessage position="top" />
            {/* <TestScreen/> */}
          </NavigationContainer>
        </PaperProvider>
  );
}
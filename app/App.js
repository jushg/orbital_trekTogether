//System Component
import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {AuthScreenStack, MainScreenTab} from "./src/navigation"

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthScreenStack/>
      </NavigationContainer>
    </PaperProvider>
  );
}

import React from 'react';
import { Provider as PaperProvider , DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { LogBox } from 'react-native';
import { NavigationContainer,  DefaultTheme as NavigationDefaultTheme,} from "@react-navigation/native";
import * as Linking from 'expo-linking';
import * as Notifications from "expo-notifications";
import FlashMessage from "react-native-flash-message";

//import testing screen here
import {MainScreenStack, RootScreenStack} from "./src/navigation"
import TestScreen from "./src/screen/SetupProfileScreen"

import colorConstant from './src/constant/color';

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
    placeholder: colorConstant.placeholder
  },
};

// Android problem with Firebase JS SDK, cannot be fixed
LogBox.ignoreLogs(["Setting a timer for a long period of"]);

const prefix = Linking.createURL('/');

export default function App() {

  // console.log(prefix);
  const linking = {
    prefixes: ["myapp://"],
    config: {
      screens: {
        Main: {
          screens: {
            Home: {
              screens: {
                Messages: 'messages'
              }
            }
          },
        },
      },
    },
    subscribe(listener) {
      const onReceiveURL = ({url}) => listener(url);
      Linking.addEventListener('url', onReceiveURL);
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        // const url = response.notification.request.content.data.url;
        // const url = prefix + "messages";
        const url = "myapp://messages";
        listener(url);
      });

      return () => {
        Linking.removeEventListener('url', onReceiveURL);
        subscription.remove();
      };
    },
  }

  return (
  <PaperProvider theme={CombinedDefaultTheme}>
    <NavigationContainer linking={linking} theme={CombinedDefaultTheme}>
      <RootScreenStack/>
      {/* <MainScreenStack/> */}
      {/* <TestScreen/> */}
      <FlashMessage position="top" />
    </NavigationContainer>
  </PaperProvider>
  );
}
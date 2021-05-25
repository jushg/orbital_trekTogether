import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screen/LoginScreen"
import WelcomeScreen from "./src/screen/WelcomeScreen"
import SignupScreen from "./src/screen/SignupScreen"
import ViewProfileScreen from "./src/screen/ViewProfileScreen"


const screens = [
  { name: "Welcome", component: WelcomeScreen },
  { name: "Login", component: LoginScreen },
  { name: "Signup", component: SignupScreen },

];

const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
       <View style={styles.container}>
        <Text>Hi Corn! Please work on me :)))))</Text>
        <StatusBar style="auto" />
      </View>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName={screens[0].name} headerMode="none">
          {screens.map(({ name, component }) => <Stack.Screen key={name} name={name} component={component} />)}
        </Stack.Navigator>
      </NavigationContainer> */}
    </PaperProvider>
  );
}

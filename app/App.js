import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet} from 'react-native';
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
  // { name: "List", component: ListScreen },
];

const Stack = createStackNavigator();
export default function App() {
  //Need to implement a reusable screen component
    //Need a logo design 
    //Need to have a constant Color Theme for all components
    //Add navigation routes
  return (
    <PaperProvider>
       {/* <View style={styles.container}>
        <Text>Hi Corn! Please work on me :)))))</Text>
        <StatusBar style="auto" />
      </View> */}
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screens[0].name} headerMode="none">
          {screens.map(({ name, component }) => <Stack.Screen key={name} name={name} component={component} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

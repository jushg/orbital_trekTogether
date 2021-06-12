import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from "./screen/LoginScreen"
import WelcomeScreen from "./screen/WelcomeScreen"
import SignupScreen from "./screen/SignupScreen"
import SettingScreen from "./screen/SettingScreen"
import HomeScreen from "./screen/ProfileScreen"
import ExploreScreen from "./screen/ExploreScreen"
import MatchScreen from "./screen/MatchScreen"
import MainScreen from "./screen/MainScreen"
import SetupScreen from "./screen/SetupScreen"
import JournalScreen from "./screen/JournalScreen"
import MessageMainScreen from "./screen/MessageMainScreen"

import * as Auth from "../api/auth"
import TestScreen from "./screen/TestScreen"

const HomeStack = createStackNavigator();

export const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator initialRouteName={"Home"} headerMode="none">
      <HomeStack.Screen name="Home" key = "home" component = {HomeScreenTab}/>
      <HomeStack.Screen name="Test" key = "test" component = {TestScreen}/>
      <HomeStack.Screen name="Setting" key = "setting" component = {SettingScreen}/>
    </HomeStack.Navigator>
  )
}

const AuthStack = createStackNavigator();

export const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName={"Main"} headerMode="none">
      <AuthStack.Screen name="Welcome" key = "welcome" component = {WelcomeScreen}/>
      <AuthStack.Screen name="Login" key = "login" component = {LoginScreen}/>
      <AuthStack.Screen name="Signup" key = "signup" component = {SignupScreen}/>
      <AuthStack.Screen name="Home" key = "home" component = {HomeScreenStack}/>
      <AuthStack.Screen name="Main" key = "main" component = {MainScreen}/>
      <AuthStack.Screen name="Setup" key = "setup" component = {SetupScreen}/>
    </AuthStack.Navigator>
  )
}

const MainStack = createStackNavigator();

export const MainScreenStack = () => {
  
  return (
    <MainScreenStack.Navigator>
      {}
    </MainScreenStack.Navigator>
  )
}
const HomeTab = createMaterialBottomTabNavigator();

export const HomeScreenTab = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="Home"
      // activeColor="#e91e63"
      // barStyle={{ backgroundColor: 'tomato' }}
    >
      <HomeTab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook-outline" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-circle" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Buddy"
        component={MatchScreen}
        options={{
          tabBarLabel: 'Buddy',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Message"
        component={MessageMainScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

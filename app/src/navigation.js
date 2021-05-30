import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from "./screen/LoginScreen"
import WelcomeScreen from "./screen/WelcomeScreen"
import SignupScreen from "./screen/SignupScreen"
import SettingScreen from "./screen/SettingScreen"
import HomeScreen from "./screen/HomeScreen"
import RouteScreen from "./screen/RouteScreen"
import MatchScreen from "./screen/MatchScreen"
import TestScreen from "./screen/TestScreen"

const HomeStack = createStackNavigator();

export const HomeScreenStack = () => {
    return (
        <HomeStack.Navigator
            initialRouteName={"Home"} 
            headerMode="none" 
        >
            <HomeStack.Screen name="Home" key = "home" component = {HomeScreenTab}/>
            <HomeStack.Screen name="Test" key = "test" component = {TestScreen}/>
            <HomeStack.Screen name="Setting" key = "setting" component = {SettingScreen}/>
        </HomeStack.Navigator>
    )
}

const AuthStack = createStackNavigator();

export const AuthScreenStack = () => {
    return (
        <AuthStack.Navigator
            initialRouteName={"Welcome"} 
            headerMode="none" 
        >
            <AuthStack.Screen name="Welcome" key = "welcome" component = {WelcomeScreen}/>
            <AuthStack.Screen name="Login" key = "login" component = {LoginScreen}/>
            <AuthStack.Screen name="Signup" key = "signup" component = {SignupScreen}/>
            <AuthStack.Screen name="Main" key = "mainUI" component = {HomeScreenStack}/>
        </AuthStack.Navigator>
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
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Homes',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
            />
            <HomeTab.Screen
            name="Route"
            component={RouteScreen}
            options={{
                tabBarLabel: 'Routes',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
            }}
            />
            <HomeTab.Screen
            name="Match"
            component={MatchScreen}
            options={{
                tabBarLabel: 'Matches',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
            />
        </HomeTab.Navigator>
      );
}

import React from 'react';
import { IconButton, Avatar, List } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"

//https://callstack.github.io/react-native-paper/avatar-image.html

export default ({navigation}) => {
  return (
    <Screen scrollable style={styles.container}>
        
       
        {/*<View style={{flexDirection:"row", justifyContent:"space-between"}}> */}
        {/*   <Text style={styles.title}>Home Screen</Text>*/}
        {/*  */}
        {/*  <Button*/}
        {/*    onPress={() => navigation.navigate('Setting')}*/}
        {/*    icon="cog"*/}
        {/*    color="black"*/}
        {/*    compact="true"*/}
        {/*  />*/}
        {/*</View>*/}

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View  style={{flexDirection: "row", alignItems:"center", paddingVertical: 15}}>
          <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
          <Text style={{paddingHorizontal: 10, fontSize: 25}}>Welcome, User</Text>
        </View>

        <IconButton
          onPress={() => navigation.navigate('Setting')}
          icon="cog"
          color="black"
          size={28}
        />
      </View>

        {/*<View  style={{flexDirection:"row", justifyContent:"space-between"}}>*/}
        {/*  <View  style={{flex:1, alignItems:"center"}}>*/}
        {/*    <Text>Your Trips this month</Text>*/}
        {/*    <Text> 3</Text>*/}
        {/*  </View>*/}
        {/*  <View  style={{flex:1, alignItems:"center"}}>*/}
        {/*    <Text>Your Trips this month</Text>*/}
        {/*    <Text> 3</Text>*/}
        {/*  </View>*/}
        {/*  <View  style={{flex:1, alignItems:"center"}}>*/}
        {/*    <Text>Your Trips this month</Text>*/}
        {/*    <Text> 3</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        

        {/*<Text> </Text>*/}

        <Text style={{fontSize: 20}}>New Buddies</Text>
        <View style={{height:"15%"}}>
          <ScrollView horizontal={true} contentContainerStyle={{
            alignItems:"center",
            justifyContent:"space-evenly"}}>
          {/* Wrap each avatar in a View to achieve spacing */}
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
            </View>
          </ScrollView>
        </View>
        

        <Text> </Text>
        <Text style={{fontSize: 20}}>Upcoming trips</Text>
        <View style={{height:"30%"}}>
          <List.Item
            title="Bedok Reservoir"
            description="6 Jun 2021, 7am - Buddy: Freddy"
            left={props => <List.Icon {...props} icon="account" />}
          />

          <List.Item
          title="MacRitchie Reservoir"
          description="12 Jun 2021, 3pm - Personal trip"
          left={props => <List.Icon {...props} icon="parking" />}
          />

          <List.Item
          title="Chestnut Nature Park"
          description="20 Jun 2021, 2.30pm - Buddy: Deacy"
          left={props => <List.Icon {...props} icon="account" />}
          />

          <List.Item
          title="Bukit Timah Nature Reserve"
          description="1 Jul 2021, 10am - Buddy: Roger"
          left={props => <List.Icon {...props} icon="account" />}
          />

          <List.Item
            title="The Southern Ridges"
            description="3 Jul 2021, 10am - Buddy: Brian"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </View>

    </Screen>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
    color:"#05668D"
  },
  button: {
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
   
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'space-between',
  },
});
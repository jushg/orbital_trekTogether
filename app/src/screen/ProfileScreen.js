import React from 'react';
import { Button, Avatar, List } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"

//https://callstack.github.io/react-native-paper/avatar-image.html

export default ({navigation}) => {
  return (
    <Screen style={styles.container}>
        
       
        <View style={{flexDirection:"row", justifyContent:"space-between"}}> 
           <Text style={styles.title}>Home Screen</Text>
          
          <Button
            onPress={() => navigation.navigate('Setting')}
            icon="cog"
            color="black"
            compact="true"
          />
        </View>
        <View  style={{ alignItems:"center"}}>
          <Avatar.Image size={80} source={require('../../assets/ava1.png')} />
          <Text>Welcome User</Text>
        </View>
        
        {/*<Text> </Text>*/}
        <View  style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View  style={{flex:1, alignItems:"center"}}>
            <Text>Your Trips this month</Text>
            <Text> 3</Text>
          </View>
          <View  style={{flex:1, alignItems:"center"}}>
            <Text>Your Trips this month</Text>
            <Text> 3</Text>
          </View>
          <View  style={{flex:1, alignItems:"center"}}>
            <Text>Your Trips this month</Text>
            <Text> 3</Text>
          </View>
        </View>
        

        {/*<Text> </Text>*/}

        <Text>New Buddies</Text>
        <View style={{height:"15%"}}>
          <ScrollView horizontal={true} contentContainerStyle={{
            alignItems:"center",
            justifyContent:"space-evenly",
            paddingHorizontal:10}}>
          {/* Consider wrapping each avatar in a View to achieve spacing */}
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          <Avatar.Image size={80} source={require('../../assets/ava2.png')} />
          </ScrollView>
        </View>
        

        <Text> </Text>
        <Text>Your next trips</Text>
        <View style={{height:"30%"}}>
        <ScrollView>
          <List.Item
          title="1"
          description="2"
          left={props => <List.Icon {...props} icon="parking" />}
        />

        <List.Item
          title="3"
          description="4"
          left={props => <List.Icon {...props} icon="account" />}
        />

        <List.Item
          title="5"
          description="6"
          left={props => <List.Icon {...props} icon="account" />}
        />

        <List.Item
          title="7"
          description="8"
          left={props => <List.Icon {...props} icon="account" />}
        />
        </ScrollView>
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
import React from 'react';
import { IconButton, Avatar, List } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

import Screen from "../component/screen"

//https://callstack.github.io/react-native-paper/avatar-image.html

export default ({navigation}) => {
  
  
  const renderTrip = ({item}) => {
    return (
      <View>
        <List.Item
            title="Bedok Reservoir"
            description="6 Jun 2021, 7am - Buddy: Freddy"
            left={props => <List.Icon {...props} icon="account" />}
          />
      </View>
      
    )
  }
  const renderBuddy = ({item}) => {
      return (
        <View style={{paddingHorizontal: 2}}>
          <Avatar.Image size={80} source={require('../../assets/ava6.jpg')} />
        </View>
      )
  }
  return (
    <Screen style={styles.container}>
        
       
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

      <View style={{flex: 2,flexDirection: "row", justifyContent: "space-between"}}>
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
    

        <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}>New Buddies</Text>
        <View style={{flex: 1}}>
          <FlatList
          data={['1', '2', '3', '4', '5', '6', '7',"8"]}
          renderItem={renderBuddy}
          keyExtractor={item => item}
          horizontal={true}
          pagingEnabled/>
        </View>
        
        <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}>New Buddies</Text>
        <Text> </Text>
        <Text style={{fontSize: 20}}>Upcoming trips</Text>
        <View style={{flex: 3.5}}>
          <FlatList
          data={['1', '2', '3', '4', '5', '6', '7',"8"]}
          renderItem={renderTrip}
          keyExtractor={item => item}/>
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
    justifyContent: 'flex-start',
  },
});
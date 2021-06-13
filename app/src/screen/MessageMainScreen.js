import React from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { List, Avatar} from "react-native-paper"

//https://docs.expo.io/versions/latest/sdk/permissions/

import Screen from "../component/screen"

export default ({navigation}) => {
  //This item include (partnerID, last message, time stamp)
  
  const renderBuddy = ({item}) => {
    return (
      <View>
        <List.Item
          title="User 1"
          description="You: Hello!"
          left={props => <List.Icon {...props} icon="account" />}
        />
      </View>
    )
  }
  const renderNewBuddy = ({item}) => {
    return (
      <View style={{paddingHorizontal: 2}}>
        <Avatar.Image size={80} source={require('../../assets/ava6.jpg')} />
      </View>
    )
}

  return (
    <Screen style={styles.container}>
        <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}>New Buddies</Text>
        <View style={{flex: 1}} >
          <FlatList
          data={['1', '2', '3', '4', '5', '6', '7',"8"]}
          renderItem={renderNewBuddy}
          keyExtractor={item => item}
          horizontal={true}
          pagingEnabled/>
        </View>
      <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}>Messages</Text>

      <View style={{flex: 7}}>
        <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        renderItem={renderBuddy}
        keyExtractor={item => item}
        />
      </View>


    </Screen>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 10,
    color:"#05668D"
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
  },
});
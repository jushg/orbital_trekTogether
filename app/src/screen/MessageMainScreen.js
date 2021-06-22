import React from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { List, Avatar} from "react-native-paper"
import { CommonActions } from '@react-navigation/native'

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
          onPress={ () => navigation.dispatch(CommonActions.navigate({
            name: 'Chat',
            //use this to pass in the name of other user
            params: {user: 'Love is in the air'},
            })
          )}
        />
      </View>
    )
  }
  const renderNewBuddy = ({item}) => {
    return (
      <View style={{paddingHorizontal: 8}}>
        <Avatar.Image size={80} source={require('../../assets/ava6.jpg')} />
      </View>
    )
}

  return (
    <Screen style={styles.container}>
        <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10, paddingBottom: 10}}>New Buddies</Text>
        <View  >
          <FlatList
          data={['1', '2', '3', '4', '5', '6', '7',"8"]}
          renderItem={renderNewBuddy}
          keyExtractor={item => item}
          horizontal={true}
          />
        </View>
      <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10}}>Messages</Text>

      <View style={{flex: 1}}>
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
    paddingHorizontal: 10
  },
});
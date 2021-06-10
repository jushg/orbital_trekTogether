import React, { useState } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { List, Searchbar } from "react-native-paper"

//https://docs.expo.io/versions/latest/sdk/permissions/

import Screen from "../component/screen"

export default ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState(''); //Example

  const onChangeSearch = query => setSearchQuery(query); // Example
  //This item include (partnerID, last message, time stamp)
  const renderList = ({item}) => {
    return (
      <View>
       <List.Item
        title="Nguyen EE"
        description="You: Hello!"
        left={props => <List.Icon {...props} icon="account" />}
      />
      </View>
    )
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Your buddies</Text>
      <View style={{alignItems:"center"}}>
      <Searchbar
        placeholder="Search Buddy"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{marginBottom:10, width:"95%"}}
      />
      </View>
      <View style={{flex: 10 }}>
        <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        renderItem={renderList}
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
  button: {
    width:"70%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    backgroundColor:"#028090",
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // backgroundColor: '#F0F3BD',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
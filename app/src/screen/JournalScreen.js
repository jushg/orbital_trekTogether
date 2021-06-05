import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { List, Searchbar } from "react-native-paper"

import Screen from "../component/screen"

export default ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState(''); //Example

  const onChangeSearch = query => setSearchQuery(query); // Example

  return (
    <Screen style={styles.container} scrollable>
      <Text style={styles.title}>Journal Screen</Text>
      <Searchbar
        placeholder="Search Trip"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Text>View your past trips with a journal entry for each trip</Text>

      <List.Item
        title="Macritchie Reservoir"
        description="nice trip, but it rain"
        left={props => <List.Icon {...props} icon="image-filter-hdr" />}
      />

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
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});
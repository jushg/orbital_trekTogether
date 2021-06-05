import React, { useState } from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { List, Searchbar } from "react-native-paper"

//https://callstack.github.io/react-native-paper/list-item.html
//https://callstack.github.io/react-native-paper/searchbar.html

import Screen from "../component/screen"

export default ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState(''); //Example

  const onChangeSearch = query => setSearchQuery(query); // Example

  return (
    <Screen scrollable style={styles.container}>
      <Text style={styles.title}>Your buddies</Text>
      <Text> This is a screen to chat with your buddies</Text>
      <Searchbar
        placeholder="Search Name"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/* Example of a search bar
           To Do: Implement a mapping function for list.item
      */}

      <List.Item
        title="Nguyen EE"
        description="You: Hello!"
        left={props => <List.Icon {...props} icon="account" />}
      />
      <List.Item
        title="Khoa CHE"
        description="Khoa: Bye"
        left={props => <List.Icon {...props} icon="account" />}
      />
      <List.Item
        title="Cuong PFM"
        description="Cuong: Mala ?"
        left={props => <List.Icon {...props} icon="account" />}
      />
      <List.Item
        title="Vinh CS"
        description="You: Wjbu ko?"
        left={props => <List.Icon {...props} icon="account" />}
      />
      <List.Item
        title="Mai BZA"
        description="You: Bye"
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
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
import React, { useState } from 'react'
import {StyleSheet, Text, View, Pressable } from 'react-native';
import { Button, Divider, List, Menu, Provider, Searchbar} from "react-native-paper";

// https://callstack.github.io/react-native-paper/menu.html

import Screen from "../component/screen"

export default ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState(''); //Example
  const onChangeSearch = query => setSearchQuery(query); // Example

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const sortNewest = () => {console.log("sortNewest")};
  const sortOldest = () => {};

  return (
    <Screen scrollable style={styles.container}>
      <Text style={styles.title}>Journals</Text>
      {/*<Searchbar*/}
      {/*  placeholder="Search Trip"*/}
      {/*  onChangeText={onChangeSearch}*/}
      {/*  value={searchQuery}*/}
      {/*/>*/}

      {/*<Text>View your past trips with a journal entry for each trip</Text>*/}

      {/*<Provider>*/}
        <View style={{flexDirection: 'row-reverse', flex: 1}}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Order by</Button>}
            style={{paddingTop: 30}}>
            <Menu.Item onPress={sortNewest} title="Newest" />
            <Menu.Item onPress={sortOldest} title="Oldest" />
          </Menu>
        </View>
      {/*</Provider>*/}

      <List.Item
        title="MacRitchie Reservoir"
        description="nice trip, but it rained"
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
    flex: 1,
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
    justifyContent: 'flex-start'
  },
});
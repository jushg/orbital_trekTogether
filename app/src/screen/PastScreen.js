import React, { useState } from 'react'
import {StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, List, Menu, Searchbar, IconButton, FAB} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";


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
  //This item include subject, time, place, destination, partner, description
  const renderList = ({item}) => {
    return (
      <View>
        <List.Item
        title="MacRitchie Reservoir"
        description="nice trip, but it rained"
        left={props => <List.Icon {...props} icon="image-filter-hdr" />}
      />
      </View>
    )
  }

  return (
    <Screen style={styles.container}>
      
        
      <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
      <Searchbar
          placeholder="Search Trip"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
      />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton onPress={openMenu} icon="sort-variant"/>}
          style={{paddingTop: 30}}>
          <Menu.Item onPress={sortNewest} title="Newest" />
          <Menu.Item onPress={sortOldest} title="Oldest" />
        </Menu>
      </View>  
  
      <View style={{flex: 1}}>
        <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        renderItem={renderList}
        keyExtractor={item => item}
        />
        <FAB
            style={styles.fab}
            icon="plus"
            onPress={() =>  navigation.dispatch(CommonActions.navigate({
              name: 'Add Trip',            
              })
            )}
          /> 
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
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
  fab: {
    position: 'absolute',
    backgroundColor:"teal",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  searchBar: {
    marginBottom: 10,
    borderRadius:20,
    // backgroundColor:"lightblue"
    width:"80%"
  }
});
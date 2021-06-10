import React, { useState } from 'react'
import {StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, List, Menu, Searchbar} from "react-native-paper";

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
      
      <Text style={styles.title}>Journals</Text>
      <View style={{alignItems:"center"}}>
      <Searchbar
        placeholder="Search Trip"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{marginBottom:10, width:"95%"}}
      />
      </View>
      <View style={{flexDirection: 'row', justifyContent:"space-between", flex: 1}}>
            <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}> Your History</Text>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button onPress={openMenu}>Order by</Button>}
              style={{paddingTop: 30}}>
              <Menu.Item onPress={sortNewest} title="Newest" />
              <Menu.Item onPress={sortOldest} title="Oldest" />
            </Menu>
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
    flex: 1,
    fontSize: 30,
    paddingTop: 10,
    color:"#05668D"
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // backgroundColor: '#F0F3BD',
    justifyContent: 'flex-start'
  },
});
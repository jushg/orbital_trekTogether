import React, {useState} from 'react';
import { List, Searchbar, Button, FAB, IconButton, Menu} from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {CommonActions} from "@react-navigation/native";


import Screen from "../component/screen"

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

  const [searchQuery, setSearchQuery] = useState(''); //Example
  const onChangeSearch = query => setSearchQuery(query); // Example

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const sortNewest = () => {console.log("sortNewest")};
  const sortOldest = () => {};
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
      
      <View style={{flex:1}}>
          <FlatList
            data={['1', '2', '3', '4', '5', '6', '7',"8"]}
            renderItem={renderTrip}
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
  fab: {
    position: 'absolute',
    backgroundColor:"teal",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    paddingHorizontal: 10
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    // backgroundColor:"lightblue"
    width:"80%"
  }
});
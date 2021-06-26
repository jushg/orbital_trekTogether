import React, {useContext, useEffect, useState} from 'react';
import {List, Searchbar, Button, IconButton, Menu, Divider, Avatar} from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';


import Screen from "../component/screen"
import firebase from "../../utils/firebase";
import { DashboardFAB } from '../component/fab';
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";

export default ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState(''); // Example
  const onChangeSearch = query => setSearchQuery(query); // Example

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const sortNewest = () => {console.log("sortNewest")};
  const sortOldest = () => {};

  const {user} = useContext(UserContext);
  const [futureTrips, setFutureTrips] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.toDateString());
    const unsubscribeTripListener = firebase.firestore()
      .collection("trips")
      .where("members", "array-contains", user.uid)
      .where("date", ">=", today)
      .orderBy("date", "asc")
      .onSnapshot(querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setFutureTrips(results);
      });

    return () => unsubscribeTripListener();
  }, []);


  return (
    <View style={styles.container}>
        {/* <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
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
      </View>  */}
      <FlatList
        data={futureTrips}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ () => <Divider/> }
        // renderItem={renderFutureTrip}
        renderItem={({item}) => Trip.renderTrip({item, user})}
      />

      <DashboardFAB navigation={navigation} />

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
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
    paddingHorizontal: 10
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    width:"80%"
  }
});
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList } from 'react-native';
import {Button, List, Menu, Searchbar, IconButton, Avatar, Divider} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

import { DashboardFAB } from '../component/fab';
import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import Screen from "../component/screen"
import * as Trip from "../../utils/trip";

export default ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState(''); //Example
  const onChangeSearch = query => setSearchQuery(query); // Example

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const sortNewest = () => {console.log("sortNewest")};
  const sortOldest = () => {};

  const {user} = useContext(UserContext);
  const [pastTrips, setPastTrips] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.toDateString());
    const unsubscribeTripListener = firebase.firestore()
      .collection("trips")
      .where("members", "array-contains", user.uid)
      .where("date", "<", today)
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setPastTrips(results);
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
        data={pastTrips}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ () => <Divider/> }
        renderItem={({item}) => Trip.renderTrip({item, user})}
      />

      <DashboardFAB navigation={navigation} />

    </View>
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
  searchBar: {
    marginBottom: 10,
    borderRadius:20,
    // backgroundColor:"lightblue"
    width:"80%"
  }
});
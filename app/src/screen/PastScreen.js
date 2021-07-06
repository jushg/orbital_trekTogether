import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet,  View, FlatList } from 'react-native';
import {Caption, ActivityIndicator, Divider} from "react-native-paper";

import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";

export default ({navigation}) => {


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
    <>
    {pastTrips == null ? 
      <View style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </View> :
      pastTrips.length === 0?
      <View style={styles.loadingContainer}> 
        <Caption>You have no recorded journals</Caption>
      </View> :
      <View style={styles.container}>
        <FlatList
          data={pastTrips}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ () => <Divider/> }
          renderItem={({item}) => Trip.renderTrip({item, user, navigation})}
        />
      </View>
      }
    </>
    
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
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
});
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

  // const [searchQuery, setSearchQuery] = useState(''); //Example
  // const onChangeSearch = query => setSearchQuery(query); // Example

  // const [visible, setVisible] = useState(false);
  // const openMenu = () => setVisible(true);
  // const closeMenu = () => setVisible(false);
  // const sortNewest = () => {console.log("sortNewest")};
  // const sortOldest = () => {};
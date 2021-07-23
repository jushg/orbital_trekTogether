import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Caption, Card, Paragraph, Avatar} from "react-native-paper";
import {StyleSheet, View, FlatList } from 'react-native';

import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Notifications from "../../utils/notifications";
import * as Trip from "../../utils/trip";
import colorConst from '../constant/color';
import FutureCard from '../component/FutureCard';

export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [futureTrips, setFutureTrips] = useState(null);

  useEffect(() => {
    const setUpPushNotifications = async () => {
      await Notifications.registerForPushNotificationsAsync(user);
      Notifications.setForegroundNotificationHandler();
    };
    setUpPushNotifications();
  }, []);

  
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
    <>
    {futureTrips == null ? 
      <View style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </View> :
      futureTrips.length === 0?
      <View style={styles.loadingContainer}> 
        <Caption>You have no plans</Caption>
      </View> :
      <View style={styles.container}>
      <FlatList
        data={futureTrips}
        keyExtractor={item => item.id}
        // ItemSeparatorComponent={ renderDivider}
        // renderItem={renderFutureTrip}
        // renderItem={({item}) => Trip.renderTrip({item, user})}
        renderItem={({item}) => renderCard({item, user, navigation})}
        ListFooterComponent={renderFootnote}
      /> 
    </View>
      }
    </>
  )
}

const renderFootnote = () => {
  return (
   <Caption style={{alignSelf:"center", paddingVertical: 25}}>
     Press and hold to view the trip details
   </Caption>
  )
}

/*
Trip invitation:
render trip:
    if members.length == 2 then “Going with” / “Went with” + buddy name
		elif inviting == "" then “Solo trip”
		else “Pending reply from buddy_uid”
*/

const renderCard = ({item,user, navigation}) => {
  return(
    <FutureCard item={item} user={user} navigation={navigation}/>
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
    paddingHorizontal: "1.5%"
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    width:"80%"
  }
});

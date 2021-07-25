import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet,  View, FlatList } from 'react-native';
import {Caption, ActivityIndicator, Card, Paragraph, Avatar, Subheading} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

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
          style={{paddingHorizontal:"2%"}}
          data={pastTrips}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderTrip({item, user, navigation})}
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
     Press a trip to view its journal entry
   </Caption>
  )
}
const renderTrip = ({item, user, navigation}) => {
  const date = item.date.toDate().toLocaleDateString();

  const hasBuddy = item.members.length === 2;
  let buddyDesc = '';
  if (hasBuddy) {
    buddyDesc = `Going with ${item.otherMemberName[user.uid]}`;
  } else if (!item.inviting.name) {
    buddyDesc = "Solo trip";
  } else {
    buddyDesc = `Pending reply from ${item.inviting.name}`;
  }

  let placeDesc = item.place;
  if (Array.isArray(item.place)) {
    placeDesc = item.place.join(", ");
  }
  return (
    <Card 
      mode="outlined"
      style={{marginVertical:"1.5%", backgroundColor:"white", borderWidth:0.5, borderRadius:10, elevation:5}}
      onPress={ navigation ? () => navigation.dispatch(CommonActions.navigate({
        name: 'View Journal',
        params: {trip: item, otherName: buddyDesc,} //otherID: otherID},
      })
      ) : null} 
      >
        <Card.Title 
          title={item.routeName?item.routeName:item.place} 
          subtitle={`${date} - ${buddyDesc}`} 
          subtitleNumberOfLines={3}
          right={(props) => {
            if (hasBuddy)
              return (
                <View style={{justifyContent:'center', padding:'1.5%'}}>
                  <Avatar.Image {...props} size={60} source={{uri: item.otherAvatarURL[user.uid]}}/>
                </View>
              );
          }} />
        <Card.Content>
          <Paragraph style={{fontStyle: "italic"}}>{`Destination: ${placeDesc}`}</Paragraph>
        </Card.Content>
       
    </Card>
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
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
});
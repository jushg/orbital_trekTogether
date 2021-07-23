import React, {useContext, useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {ActivityIndicator, Caption} from "react-native-paper";

import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";
import InvitationTile from "../component/InvitationTile";


export default ({navigation}) => {

  const {user} = useContext(UserContext);
  const [invitations, setInvitations] = useState(null);
  const acceptedTrips = [];
  const declinedTrips = [];

  useEffect(() => {
    const today = new Date(new Date().toDateString());
    firebase.firestore()
      .collection("trips")
      .where("inviting.uid", "==", user.uid)
      .where("date", ">=", today)
      .orderBy("date", "asc")
      .onSnapshot(querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            inviterID: doc.data().members[0],
            ...doc.data()
          };
        });
        setInvitations(results);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      const promises = [
        Trip.acceptInvitations(user, acceptedTrips),
        Trip.declineInvitations(user, declinedTrips)
      ];
      Promise.all(promises)
        .then(res => {
          console.log(res);
          navigation.dispatch(e.data.action);
        });
    });
    return () => unsubscribe();
  }, [acceptedTrips, declinedTrips]);

  const renderInvitation = ({item, index}) => {
    // console.log("render invitation " + index);
    return (
      <InvitationTile
        trip={item}
        index={index}
        onAccept={(trip) => {
          acceptedTrips.push(trip);
          console.log("Accepted: " + acceptedTrips.length);
        }}
        onDecline={(trip) => {
          declinedTrips.push(trip);
          console.log("Declined: " + declinedTrips.length);
        }}
      />
    )
  };

  return (
    <>
      {invitations == null
        ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black"/>
        </View>
        :
        invitations.length === 0
          ?
          <View style={styles.loadingContainer}>
            <Caption>No pending invitations!</Caption>
          </View>
          :
          <View style={styles.container}>
            <FlatList
              style={{padding: "2%"}}
              data={invitations}
              keyExtractor={item => item.id}
              renderItem={renderInvitation}
            />
          </View>
      }
    </>
  )
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
  }
});

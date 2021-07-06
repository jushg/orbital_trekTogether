import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {UserContext} from "../../utils/context";

import * as Journal from "../../utils/journal";
import firebase from "../../utils/firebase";

export default ({navigation, route}) => {

  const {user} = useContext(UserContext);

  const trip = route.params.trip;
  const otherName = route.params.otherName;

  const [journal, setJournal] = useState(null);
  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => setJournal(doc.data()));

    return () => unsubscribeJournalListener();
  }, []);

  return (
    <>
    {journal == null
      ?
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black"/>
      </View>
      :
      <View style={styles.container}>
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <Text>Place: {trip.place}</Text>
          <Text>{otherName ? "Buddy: " + otherName : "Solo trip"}</Text>
          <Text style={{fontStyle: 'italic', color: 'green'}}>Last edited
            by: {journal.lastEditedBy}</Text>
        </View>

        {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
        {/*  <Text>Move edit button to headerRight.</Text>*/}
        {/*  <Button*/}
        {/*    onPress={() => navigation.dispatch(CommonActions.navigate({*/}
        {/*        name: 'Edit Journal',*/}
        {/*        params: {journal: journal} //otherName: otherUsername, otherID: otherID},*/}
        {/*      })*/}
        {/*    )}>Press to edit</Button>*/}
        {/*</View>*/}

        <Text>Photos go here.</Text>
        <Text>[Journal text] {journal.text} [End]</Text>

      </ScrollView>
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
    padding: 10,
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
});
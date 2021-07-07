import React, {useEffect, useState} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View
} from "react-native";
import {ActivityIndicator} from "react-native-paper";

import firebase from "../../utils/firebase";

export default ({navigation, route}) => {

  const containerPadding = 10;
  const borderWidth = 3;
  const photoWidth = useWindowDimensions().width - 2 * containerPadding;

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
      <ScrollView style={styles.container}>
        <Text>Place: {trip.place}</Text>
        <Text>{otherName ? "Buddy: " + otherName : "Solo trip"}</Text>
        <Text style={{fontStyle: 'italic', color: 'green'}}>Last edited by: {journal.lastEditedBy}</Text>

        {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
        {/*  <Text>Move edit button to headerRight.</Text>*/}
        {/*  <Button*/}
        {/*    onPress={() => navigation.dispatch(CommonActions.navigate({*/}
        {/*        name: 'Edit Journal',*/}
        {/*        params: {journal: journal} //otherName: otherUsername, otherID: otherID},*/}
        {/*      })*/}
        {/*    )}>Press to edit</Button>*/}
        {/*</View>*/}

        {/* CONSIDER USING Pressable */}
        <TouchableHighlight
          style={{
            ...styles.profileImgContainer,
            width: photoWidth,
            height: photoWidth * 2 / 3,
            borderWidth: borderWidth,
            backgroundColor: 'silver'
          }}
          underlayColor={'gray'}
          onPress={() => {
            console.log("pressed photo");
            navigation.navigate("Journal Photos", {'photos': journal.photos});
          }}
        >
          <Image
            source={require("../../assets/ava1.jpg")}
            resizeMode={'contain'}
            style={{...styles.profileImg, width: photoWidth, height: photoWidth * 2 / 3}}
          />
        </TouchableHighlight>
        <Text style={{alignSelf: 'center', fontStyle: 'italic', color: 'green', marginBottom: 5}}>
          Click the above image to view photos
        </Text>

        <Text>[Journal text] {journal.text} [End]</Text>

      </ScrollView>
    }
    </>
  )
};

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
  profileImgContainer: {
    overflow: 'hidden',
    marginVertical: 8,
    // height: 80,
    // width: 80,
    borderRadius: 5,
    borderColor: 'green',
  },
  profileImg: {
    // height: 80,
    // width: 80,
    borderRadius: 5,
  },
});
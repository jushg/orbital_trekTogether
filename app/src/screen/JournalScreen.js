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

  const photoWidth = useWindowDimensions().width - 2 * styles.container.padding;

  const trip = route.params.trip;
  const otherName = route.params.otherName;

  const [journal, setJournal] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => {
        const data = doc.data();
        setJournal(data);
        if (data.photos.length > 0) setThumbnailUrl(data.photos[data.photos.length - 1]);
      });

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
            ...styles.thumbnailContainer,
            width: photoWidth,
            height: photoWidth * 2 / 3,
            backgroundColor: 'silver'
          }}
          underlayColor={'gray'}
          disabled={!thumbnailUrl}
          onPress={() => navigation.navigate("Journal Photos", {'photos': journal.photos})}
        >
          { thumbnailUrl
          ? <Image
            // source={require("../../assets/ava1.jpg")}
            source={{ uri: thumbnailUrl }}
            resizeMode={'contain'}
            style={{width: photoWidth, height: photoWidth * 2 / 3}}
          />
          : <Text style={{color: 'white', fontSize: 16}}>You haven't uploaded any photos yet!</Text>
          }
        </TouchableHighlight>
        <Text style={styles.thumbnailCaption}>Click the above image to view photos</Text>

        <Text>[Journal text] {journal.text} [End]</Text>

      </ScrollView>
    }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  thumbnailContainer: {
    overflow: 'hidden',  // (?)
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailCaption: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'green',
    marginBottom: 5
  }
});
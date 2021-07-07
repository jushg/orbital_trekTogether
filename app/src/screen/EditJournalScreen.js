import React, {useContext, useEffect, useState} from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text, TouchableHighlight, useWindowDimensions,
  View
} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import {TextInput} from "react-native"

import firebase from "../../utils/firebase";
import * as Journal from "../../utils/journal";
import {UserContext} from "../../utils/context";
import * as ImagePicker from "expo-image-picker";

export default ({navigation, route}) => {

  const photoWidth = useWindowDimensions().width - 2 * styles.container.padding;

  const {user} = useContext(UserContext);
  const trip = route.params.trip;

  const [isTextChanged, setIsTextChanged] = useState(false);

  const [journal, setJournal] = useState(null);
  // const [photos, setPhotos] = useState(null);
  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => {
        const data = doc.data();
        setJournal(data);
      });

    return () => unsubscribeJournalListener();
  }, []);

  // instead of using isTextChanged, add a listener for when the screen goes out of focus (i.e. press Back)
  // However, this does not provide real time updates for TEXT if the buddy is also editing TEXT.
  // Conversely, changes to photos will not be updated in real time.
  // useEffect(() => {
  //   // const unsubscribe = navigation.addListener('blur', () => {
  //   //   Journal.updateJournal(trip.id, user.displayName, journal.text)
  //   //     .then(console.log);
  //   // });
  //   console.log("run effect...")
  //   const unsubscribe = navigation.addListener('beforeRemove', () => {
  //     console.log("BACK")
  //     Journal.updatePhotos(trip.id, journal.photos)
  //       .then(console.log);
  //   });
  //
  //   return () => unsubscribe();
  // }, [journal])
  // // }, [photos])

  let hasCameraRollPermission = false;
  const handlePickImage = async () => {
    if (!hasCameraRollPermission) {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Please enable access permission for camera roll!');
        return;
      }
      else hasCameraRollPermission = true;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({quality: 0.25});
    if (!pickerResult.cancelled) {
      Journal.uploadOnePhoto(trip.id, user.displayName, pickerResult.uri)
        .then(console.log);

      // const photos = [...journal.photos];
      // photos.push(pickerResult.uri);
      // setJournal({...journal, photos});
    }
  };

  if (!journal) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={75} >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>

      <TouchableHighlight
        style={{
          ...styles.thumbnailContainer,
          width: photoWidth,
          height: photoWidth * 2 / 3,
          backgroundColor: 'silver'
        }}
        underlayColor={'gray'}
        disabled={journal.photos.length === 0}
        onPress={() => navigation.navigate("Journal Photos", {'photos': journal.photos})}
      >
        { journal.photos.length > 0
          ? <Image
            // source={require("../../assets/ava1.jpg")}
            source={{ uri: journal.photos[journal.photos.length - 1] }}
            resizeMode={'contain'}
            style={{width: photoWidth, height: photoWidth * 2 / 3}}
          />
          : <Text style={{color: 'white', fontSize: 16}}>You haven't uploaded any photos yet!</Text>
        }
      </TouchableHighlight>

      <Button onPress={handlePickImage}>Add photos</Button>

      <TextInput
        style={styles.input}
        // autoFocus={true}
        multiline={true}
        autoCorrest={false}
        scrollEnabled={false}
        underlineColorAndroid="transparent"
        placeholder="Jot down a few lines..."
        onChangeText={text => {
          setIsTextChanged(true);
          setJournal({...journal, text});
        }}
        value={journal.text}
        onEndEditing={() => {
          if (isTextChanged) {
            Journal.updateText(trip.id, user.displayName, journal.text)
              .then(res => res ? setIsTextChanged(false) : console.log("failed to update journal text"))
          }
        }}
      />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  input: {
    // flex: 1,
    // padding: 10,
    // fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: 'gray'
  },
});
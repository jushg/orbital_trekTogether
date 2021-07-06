import React, {useContext, useEffect, useRef, useState} from "react";
import {Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {TextInput} from "react-native"

import firebase from "../../utils/firebase";
import * as Journal from "../../utils/journal";
import {UserContext} from "../../utils/context";

export default ({navigation, route}) => {

  const {user} = useContext(UserContext);
  const trip = route.params.trip;

  const [journal, setJournal] = useState(null);
  const [isTextChanged, setIsTextChanged] = useState(false);
  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => setJournal(doc.data()));

    return () => unsubscribeJournalListener();
  }, []);

  // // instead of using isTextChanged, add a listener for when the screen goes out of focus (i.e. press Back)
  // // However, this does not provide real time updates if the buddy is also editing.
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     Journal.updateJournal(trip.id, user.displayName, journal.text)
  //       .then(console.log);
  //   });
  //
  //   return () => unsubscribe();
  // }, [journal])

  if (!journal) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <View style={styles.container}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
    // style={styles.container}
    >

      {/*<Text>Edit a journal item.</Text>*/}
      <Image source={require("../../assets/ava1.png")} style={{height: 150, width: 100}} />
      <Button onPress={() => {}}>Add photos</Button>

      <TextInput
        style={styles.input}
        // autoFocus={true}
        multiline={true}
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
            Journal.updateJournal(trip.id, user.displayName, journal.text)
              .then(res => res ? setIsTextChanged(false) : console.log("failed to update journal text"))
          }
        }}
      />

    </ScrollView>
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
      {/*<Button onPress={() => {}}>Add photos</Button>*/}
    </KeyboardAvoidingView>

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
    // flex: 1,
    padding: 10,
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  input: {
    // flex: 1,
    // padding: 10,
    // fontSize: 16,
    textAlignVertical: 'top',
  },
});
import React, {useContext, useEffect, useState} from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import {ActivityIndicator} from "react-native-paper";
import {TextInput} from "react-native"

import firebase from "../../utils/firebase";
import * as Journal from "../../utils/journal";
import {UserContext} from "../../utils/context";


export default ({route}) => {

  const {user} = useContext(UserContext);
  const trip = route.params.trip;

  const [isTextChanged, setIsTextChanged] = useState(false);
  const [journalText, setJournalText] = useState(null);
  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => {
        setJournalText(doc.data().text);
      });

    return () => unsubscribeJournalListener();
  }, []);


  if (journalText == null) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100} >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>

          <TextInput
            style={styles.input}
            multiline={true}
            autoCorrest={false}
            scrollEnabled={false}
            underlineColorAndroid="transparent"
            placeholder="Jot down a few lines..."
            value={journalText}
            onChangeText={text => {
              setIsTextChanged(true);
              setJournalText(text);
            }}
            onEndEditing={() => {
              if (isTextChanged) {
                Journal.updateText(trip.id, user.displayName, journalText)
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
  input: {
    // flex: 1,
    // padding: 10,
    // fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: 'gray'
  },
});
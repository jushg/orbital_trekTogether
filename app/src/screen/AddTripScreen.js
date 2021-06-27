import React, {useState, useEffect, useContext} from 'react';
import {View,  Platform, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, TextInput, Headline, Subheading, List, ActivityIndicator} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import Screen from "../component/screen"
import * as Trip from '../../utils/trip';
import { UserContext } from '../../utils/context';
import firebase from "../../utils/firebase";
import {Actions} from "react-native-gifted-chat";
import {showMessage} from "react-native-flash-message";
import colorConst from '../constant/color';
import { FONT_SANS_10_BLACK } from 'jimp';
export default ({navigation}) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [buddy, setBuddy] = useState("None");
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("")

  const {user} = useContext(UserContext);

  const [myBuddies, setMyBuddies] = useState(null);

  useEffect(() => {
    const unsubscribeBuddiesListener = firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(snapshot => {
        const b = snapshot.data().buddies;    // array of uid, which are strings
        const promises = [];
        // read data from firestore; firestore returns a promise
        b.map(buddy => promises.push(
          firebase.firestore().collection("users")
            .doc(buddy)
            .get()
        ))
        // wait till all promises are resolved, then set state
        Promise.all(promises).then(allResponses => {
          const result = [];
          allResponses.map(doc => {
            const data = doc.data();
            result.push(data);
          });
          setMyBuddies(result);
        });
      });

    return () => unsubscribeBuddiesListener();
  }, []);

  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleAddTrip = () => {
    // let time = date.toLocaleDateString(undefined, options);
    Trip.addTrip(
      {user, buddy, place, date, notes},
      (source) => {
        console.log("Added trip successfully");
        navigation.navigate(source);
      },
      (error) => {
        showMessage({
          message: error,
          type: "warning",
          duration: 1600,
          floating: true,
          icon: "auto"
        });
        console.error(error);
      }
    )
  }

  return (
      <Screen style={styles.container}>
        {myBuddies == null ? <ActivityIndicator/> :
        <ScrollView>
          <Subheading style={{paddingVertical: 10}}>ROUTE</Subheading>
          <TextInput
            label="Place"
            placeholder="Somewhere nice ..."
            value={place}
            autoCapitalize="words"
            onChangeText={setPlace}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom: 10, width: "100%", alignSelf:"center"}}
          />
          
          <Subheading style={{paddingTop:10}}>DATE: { Platform.OS === 'ios' && date.toLocaleDateString(undefined, options)}</Subheading>
          {Platform.OS === 'android' && 
          <Button onPress={() => setShowPicker(true)}  color={colorConst.accent} labelStyle={{fontSize: 20}}> 
            {date.toLocaleDateString(undefined, options)} 
          </Button>}
          
          {showPicker && (
            <DateTimePicker
              // testID="dateTimePicker"
              value={date}
              mode={"date"}
              display="default"
              onChange={onChangeDatePicker}
            />
          )}

          <Subheading style={{paddingVertical: 10}}>BUDDY</Subheading>
          <Picker
            selectedValue={buddy}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              // console.log(itemValue);
              setBuddy(itemValue);
            }}
          >
            <Picker.Item label="None" value="None"/>
            {myBuddies.map(buddy => (
              <Picker.Item
                key={buddy.uid}
                value={buddy}
                label={buddy.name}
              />
            ))}
          </Picker>

          <Subheading style={{paddingVertical:10}}>NOTES</Subheading>
          <TextInput
            label="Notes"
            placeholder="Things to note..."
            value={notes}
            autoCapitalize="words"
            onChangeText={setNotes}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom: 10, width: "100%" , alignSelf:"center"}}
          />

          <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 60}}>
            <Button onPress={handleAddTrip} style={{color:colorConst.accent}}>Add</Button>
          </View>

        </ScrollView>
        }
      </Screen>
    
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf:"center",
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    padding:10
  },
  button : {
    color:colorConst.prim
  }
});

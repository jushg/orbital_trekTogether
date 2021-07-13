import React, {useState, useEffect, useContext} from 'react';
import {View,  Platform, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Subheading, TextInput, ActivityIndicator} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import Screen from "../component/screen"
import * as Trip from '../../utils/trip';
import { UserContext } from '../../utils/context';
import firebase from "../../utils/firebase";
import {Actions} from "react-native-gifted-chat";
import {showMessage} from "react-native-flash-message";
import colorConst from '../constant/color';
import TextBox from '../component/textbox'
import PlaceSearch from '../component/placeSearch';

export default ({navigation}) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [buddy, setBuddy] = useState("None");
  const [routeName, setRouteName] = useState("");
  const [place, setPlace] = useState([]);
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
      {user, buddy, place, routeName, date, notes},
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
        {myBuddies == null ? 
        <ActivityIndicator size="large" color="black"/> : 
        <ScrollView keyboardShouldPersistTaps={"handled"}>

          <Subheading style={{paddingBottom: 10, fontWeight:"bold"}}>TRIP NAME</Subheading>
          <TextBox
            placeholder="What do you call this trip ?"
            value={routeName}
            autoCapitalize="words"
            onChangeText={setRouteName}
            // left={<TextInput.Icon name="map-marker"/>}
            style={{marginBottom: 10,  alignSelf:"center"}}
          />

          <Subheading style={{paddingTop: 10, fontWeight:"bold"}}>PLACES</Subheading>
          <PlaceSearch place={place} setPlace={setPlace} textPlaceHolder="Where will this trip stop by ?" details/>

          <Subheading style={{paddingTop:10, fontWeight:"bold"}}>DATE: { Platform.OS === 'ios' && date.toLocaleDateString(undefined, options)}</Subheading>
          {Platform.OS === 'android' && 
          <Button onPress={() => setShowPicker(true)}  color={colorConst.secondaryDark} labelStyle={{fontSize: 20}}> 
            {date.toLocaleDateString(undefined, options)} 
          </Button>}


          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              
              onChange={onChangeDatePicker}
            />
          )}

          <Subheading style={{paddingVertical: 10 , fontWeight:"bold"}}>BUDDY</Subheading>
          <Picker
            // style={{height: Platform.OS === "ios" ? 132 : 69}}
            // itemStyle={{height: Platform.OS === "ios" ? 132 : 0}}
            selectedValue={buddy}
            dropdownIconColor={colorConst.secondaryDark}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              // console.log(itemValue);
              setBuddy(itemValue);
            }}
          >
            <Picker.Item label="None" value="None"/>
            {myBuddies.map((buddy, i) => (
              <Picker.Item
                key= {i}
                value={buddy}
                label={buddy.name}
              />
            ))}
          </Picker>

          <Subheading style={{paddingBottom:10 ,paddingTop:30, fontWeight:"bold"}}>NOTES</Subheading>
          <TextBox
            label="Notes"
            placeholder="Foods, weather, deadlines,..."
            value={notes}
            onChangeText={setNotes}
            // left={<TextInput.Icon name="note-text"/>}
            multiline={true}
            numberOfLines={3}
            underlineColor={colorConst.secondaryLight}
            style={{marginBottom: 10, height: 140, alignSelf:"center"}}
          />

          <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 60}}>
            <Button onPress={handleAddTrip} mode="contained" style={styles.button}>Add</Button>
          </View>

        </ScrollView>
        }
      </Screen>
    
  );
};

const styles = StyleSheet.create({
  title: {
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    padding:10
  },
  button : {
    width:'40%',
    borderRadius:25,
  }
});

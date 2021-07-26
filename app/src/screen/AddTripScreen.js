import React, {useState, useEffect, useContext} from 'react';
import {View,  Platform, StyleSheet, ScrollView} from 'react-native';
import {Button, Subheading, ActivityIndicator} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import Screen from "../component/screen"
import * as Trip from '../../utils/trip';
import { UserContext } from '../../utils/context';
import firebase from "../../utils/firebase";
import {showMessage} from "react-native-flash-message";
import colorConst from '../constant/color';
import TextBox from '../component/textbox'
import PlaceSearch from '../component/placeSearch';

export default ({navigation}) => {

  const {user} = useContext(UserContext);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [buddy, setBuddy] = useState("None");
  const [routeName, setRouteName] = useState("");
  const [place, setPlace] = useState([]);
  const [notes, setNotes] = useState("");
  const [myBuddies, setMyBuddies] = useState(null);
  const [coverPhotoRef, setCoverPhotoRef] = useState([]);
  useEffect(() => {
    const unsubscribeBuddiesListener = firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(snapshot => {
        const b = snapshot.data().buddies;    // array of uid, which are strings
        const promises = [];
        b.map(buddy => promises.push(
          firebase.firestore().collection("users")
            .doc(buddy)
            .get()
        ))
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
      {user, buddy, place, routeName, date, notes, coverPhotoRef},
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
    );
  };

  return (
      <>
      {myBuddies == null ?
      <View style={styles.container} >
        <ActivityIndicator size="large" color="black"/> 
      </View> :
      <ScrollView style={styles.container} keyboardShouldPersistTaps={"handled"}>
        <Subheading style={{paddingVertical: 10, fontWeight:"bold"}}>
          TRIP NAME
        </Subheading>
        <TextBox
          placeholder="Give this trip a name"
          value={routeName}
          // autoCapitalize="words"
          onChangeText={setRouteName}
          style={{marginBottom: 10,  alignSelf: "center"}}
        />

        <Subheading style={{paddingTop: 10, fontWeight: "bold"}}>
          PLACES
        </Subheading>
        <PlaceSearch
          place={place}
          setPlace={setPlace}
          coverPhotoRef={coverPhotoRef}
          setCoverPhotoRef={setCoverPhotoRef}
          textPlaceHolder="Places to visit on this trip"
          moreDetails
        />

        <Subheading style={{paddingTop: 10, fontWeight: "bold"}}>
          DATE: { Platform.OS === 'ios' && date.toLocaleDateString(undefined, options) }
        </Subheading>
        {Platform.OS === 'android' &&
          <Button onPress={() => setShowPicker(true)}  color={colorConst.secondaryDark} labelStyle={{fontSize: 20}}>
            {date.toLocaleDateString(undefined, options)}
          </Button>
        }
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDatePicker}
          />
        )}

        <Subheading style={{paddingVertical: 10, fontWeight: "bold"}}>
          BUDDY
        </Subheading>
        <Picker
          // style={{height: Platform.OS === "ios" ? 132 : 69}}
          // itemStyle={{height: Platform.OS === "ios" ? 132 : 0}}
          selectedValue={buddy}
          dropdownIconColor={colorConst.secondaryDark}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
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

        <Subheading style={{paddingBottom: 10 ,paddingTop: 30, fontWeight: "bold"}}>
          NOTES
        </Subheading>
        <TextBox
          label="Notes"
          placeholder="Foods, weather, deadlines,..."
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={3}
          underlineColor={colorConst.secondaryLight}
          style={{marginBottom: 10, height: 140, alignSelf: "center"}}
        />

        <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 60}}>
          <Button onPress={handleAddTrip} mode="contained" style={styles.button}>Add</Button>
        </View>

      </ScrollView>
      }
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    paddingHorizontal:10
  },
  button : {
    width:'40%',
    borderRadius:25,
  }
});

import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Platform, ScrollView, StyleSheet, View} from "react-native";
import {ActivityIndicator, Button, IconButton, Subheading} from "react-native-paper";
import {showMessage} from "react-native-flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from "@react-native-picker/picker";

import {UserContext} from "../../utils/context";
import firebase from "../../utils/firebase";
import * as Trip from "../../utils/trip";
import TextBox from "../component/textbox";
import PlaceSearch from "../component/placeSearch";
import Screen from "../component/screen";
import colorConst from "../constant/color";


export default ({navigation, route}) => {

  const trip = route.params.trip;
  const {user} = useContext(UserContext);
  const originalBuddyID = useRef(null);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const [date, setDate] = useState(trip.date.toDate());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [buddy, setBuddy] = useState("None");
  const [isBuddyChanged, setIsBuddyChanged] = useState(false);
  const [buddyStatus, setBuddyStatus] = useState(null)
  const [routeName, setRouteName] = useState(trip.routeName);
  const [place, setPlace] = useState(trip.place.map(item => {
    return {structured_formatting: {main_text: item}};
  }));
  const [notes, setNotes] = useState(trip.notes);
  const [myBuddies, setMyBuddies] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon={'delete'} onPress={onPressDelete} size={27} color={colorConst.textHeader} />
      )
    });
  }, [navigation]);

  const onPressDelete = async () => {
    await Trip.deleteTrip(trip.id);
    navigation.navigate("Future");
  };

  useEffect(() => {
    firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const b = doc.data().buddies;    // array of uid, which are strings
        const promises = [];
        b.map(buddy => promises.push(
          firebase.firestore().collection("users")
            .doc(buddy)
            .get()
        ))
        Promise.all(promises).then(allResponses => {
          const result = {};
          allResponses.map(doc => {
            result[doc.id] = {
              uid: doc.id,
              ...doc.data(),
            };
          });
          setMyBuddies(result);
          getBuddy(result);
        });
      });
    }, []);

  const getBuddy = (myBuddies) => {
    if (trip.members.length === 2) {
      originalBuddyID.current = trip.members[0] === user.uid ? trip.members[1] : trip.members[0];
      setBuddy(myBuddies[originalBuddyID.current]);
      setBuddyStatus("yes");
    } else if (trip.inviting === "") {
      setBuddy("None");
      setBuddyStatus("no");
    } else {
      setBuddy("Pending reply from " + trip.inviting.name);
      setBuddyStatus("pending");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Trip.updateTrip(
        {tripID: trip.id, user, date, isBuddyChanged, buddyStatus, buddy, originalBuddyID: originalBuddyID.current, routeName, place, notes},
        () => navigation.dispatch(e.data.action),
        (error) => {
          showMessage({
            message: error,
            type: "warning",
            duration: 1200,
            floating: true
          });
          console.error(error);
        }
      );
    });
    return () => unsubscribe();
  }, [date, isBuddyChanged, buddy, routeName, place, notes]);

  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  if (myBuddies == null) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <Screen style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Subheading style={{paddingBottom: 10, fontWeight: "bold"}}>
          TRIP NAME
        </Subheading>
        <TextBox
          placeholder="My Trip"
          value={routeName}
          autoCapitalize="words"
          onChangeText={setRouteName}
          style={{marginBottom: 10, alignSelf: "center"}}
        />
        <Subheading style={{paddingTop: 10, fontWeight: "bold"}}>
          PLACES
        </Subheading>
        <PlaceSearch
          place={place}
          setPlace={setPlace}
          textPlaceHolder="Where will this trip stop by?"
          moreDetails
        />
        <Subheading style={{paddingTop: 10, fontWeight: "bold"}}>
          DATE: { Platform.OS === 'ios' && date.toLocaleDateString(undefined, options) }
        </Subheading>
        {Platform.OS === 'android' &&
          <Button
            onPress={() => setShowPicker(true)}
            color={colorConst.secondaryDark}
            labelStyle={{fontSize: 20}}
          >
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
          BUDDY: {buddy.name}
        </Subheading>
        {buddyStatus !== "pending" &&
          <Picker
            // style={{height: Platform.OS === "ios" ? 132 : 69}}
            // itemStyle={{height: Platform.OS === "ios" ? 132 : 0}}
            selectedValue={buddy}
            dropdownIconColor={colorConst.secondaryDark}
            mode="dropdown"
            onValueChange={(itemValue) => {
              setBuddy(itemValue);
              if (itemValue.uid === originalBuddyID.current) {
                setIsBuddyChanged(false);
              } else {
                setIsBuddyChanged(true);
              }
            }}
          >
            <Picker.Item label="None" value="None"/>
            {Object.values(myBuddies).map((buddy, i) => (
              <Picker.Item
                key={i.toString()}
                value={buddy}
                label={buddy.name}
              />
            ))}
          </Picker>
        }
        {buddyStatus === "pending" && <Subheading style={{paddingBottom: 10}}>{buddy}</Subheading>}

        <Subheading style={{paddingBottom: 10, paddingTop: 30, fontWeight: "bold"}}>
          NOTES
        </Subheading>
        <TextBox
          label="Notes"
          placeholder="Food, weather, deadlines,..."
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={3}
          underlineColor={colorConst.secondaryLight}
          style={{marginBottom: 10, height: 140, alignSelf: "center"}}
        />

      </ScrollView>
    </Screen>
  
  );
}

const styles = StyleSheet.create({
  loadingContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button : {
    width: '40%',
    borderRadius: 25,
  }
});

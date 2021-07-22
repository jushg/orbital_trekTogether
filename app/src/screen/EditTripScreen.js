import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {
  ActivityIndicator,
  Avatar,
  Button, Chip,
  Divider,
  RadioButton,
  Subheading
} from "react-native-paper";

import Trip from "../../utils/trip"
import TextBox from "../component/textbox";
import PlaceSearch from "../component/placeSearch";
import Screen from "../component/screen";
import {UserContext} from "../../utils/context";
import colorConst from "../constant/color";


export default ({route}) => {

  const trip = route.params.trip;
  const currUser = useContext(UserContext).user;
  const [isLoading, setIsLoading] = useState(true);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [place, setPlace] = useState([]);
  const [buddy, setBuddy] = useState("None");
  const [notes, setNotes] = useState("")
  const [myBuddies, setMyBuddies] = useState(null);

  useEffect(() => {
    Trip.getCurrentTrip(trip.id)
      .then(trip => {
        setBuddy(trip.members)
        setPlace(trip.place.map(item => {
          return {structured_formatting: {main_text: item}};
        }));
        setDate(trip.date);
        setNotes(trip.notes)
        setIsLoading(false);
      });
  }, [])
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
  const handleUpdateTrip = async () => {
    showMessage({
      message: "Updating your Trip..\nThis might take a while",
      type: "info", duration: 1600, floating: true
    })
    Trip.updateProfile({currUser, buddy, place, routeName, date, notes},
      () => {
        //Should find a way to route back to past
        navigation.navigate("Future");
      },
      (error) => {showMessage({
        message: error,
        type: "warning",
        duration: 1600,
        floating: true,
        icon: "auto"
      });
      }
    )
  };


  return (
    <Screen style={styles.container}>
      {isLoading || buddies == null ? 
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
        <PlaceSearch place={place} setPlace={setPlace} textPlaceHolder="Where will this trip stop by ?" moreDetails/>

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
          <Button onPress={handleUpdateTrip} mode="contained" style={styles.button}>Add</Button>
        </View>

      </ScrollView>
      }
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
    // justifyContent: 'flex-start'
  },
  title: {
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  button: {
    borderRadius:25,
    marginVertical:20,
    elevation:3
  }
});
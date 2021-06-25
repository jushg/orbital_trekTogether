import React, {useState, useEffect, useContext} from 'react';
import {View,  Platform, Text, StyleSheet, ScrollView} from 'react-native';
import { Button, TextInput, Headline, Subheading } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import Screen from "../component/screen"
import { addTrip } from '../../utils/trip';
import { UserContext } from '../feature/auth';

export default () => {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const [partner,setPartner] = useState("");
  const [place,setPlace] = useState("");
  const [notes,setNotes] = useState("this is for testing")
  const userApi = useContext(UserContext);
  const uid = userApi.user.uid;

  const handleAddTrip = () => {
    // let time = date.toLocaleDateString(undefined, options);
    addTrip(
      {uid,partner,notes,place, date},
      () => {console.log("Add trip successfully")},
      (err) =>{console.error(err)} 
      )
  }

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
   onChange()
  }, []);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (
      <Screen style={styles.container}>
        <ScrollView>
          <Subheading style={{paddingVertical:10}}>Partner</Subheading>
          <TextInput
            label="Partner (optional)"
            placeholder="John Doe"
            value={partner}
            autoCapitalize="words"
            onChangeText={setPartner}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom:10, width:"95%"}}
          />
          <Subheading style={{paddingVertical:10}}>Route</Subheading>
          <TextInput
            label="Place"
            placeholder="Somewhere nice ..."
            value={place}
            autoCapitalize="words"
            onChangeText={setPlace}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom:10, width:"95%"}}
          />
          <Subheading style={{paddingVertical:10}}>Date:    {date.toLocaleDateString(undefined, options)}</Subheading>
          <Button onPress={showDatepicker}>Click here to choose the date </Button> 
          {show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
              />
          )}
          <Subheading style={{paddingVertical:10}}>Note</Subheading>
          <TextInput
              label="Notes"
              placeholder="Something to note"
              value={notes}
              autoCapitalize="words"
              onChangeText={setNotes}
              left={<TextInput.Icon name="human-male"/>}
              style={{marginBottom:10, width:"95%"}}
            />
          <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop:60}}>
            <Button onPress={handleAddTrip}>Add</Button>
          </View>
        </ScrollView>
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
  }
});

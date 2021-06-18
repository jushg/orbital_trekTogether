import React, {useState}  from 'react';
import { StyleSheet,Text, Image, View, ScrollView} from 'react-native'
import {Button, Checkbox, RadioButton, TextInput, Chip, ToggleButton} from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"
import * as Setup from "../../api/setup";

//This screen is use for setup user personal info
//https://callstack.github.io/react-native-paper/chip.html

export default ({navigation}) => {
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  // const [intro, setIntro] = useState("");
  // const [hobby, setHobby] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState([false, false, false, false, false, false, false]);
  const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleSetUpProfile = () => {
    Setup.setUpProfile(
      {age, level, place, date},
      (user) => navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{
            name: "Home",
          }]
        })),
      (error) => {console.log(error)}
    )
  };

  return (
    <Screen style={styles.container} >
      <ScrollView>
      
      <TextInput
        label="Age"
        placeholder="21"
        keyboardType="numeric"
        mode="contained"
        value={age}
        onChangeText={() => {
          const regex = /^[0-9\b]+$/;
          // if value is not blank, then test the regex
          if (age === '' && regex.test(age)) {
            setAge(age);
          }
        }}
        style={{marginBottom:10, width:"95%"}}
        // left={<TextInput.Icon name="email"/>}
        />

      {/*<ToggleButton.Row onValueChange={value => setLevel(value)} value={level}>*/}
      {/*    <ToggleButton icon="roman-numeral-1" value="1" />*/}
      {/*    <ToggleButton icon="roman-numeral-2" value="2" />*/}
      {/*    <ToggleButton icon="roman-numeral-3" value="3" />*/}
      {/*</ToggleButton.Row>*/}

      <RadioButton
        value="Beginner"
        status={ checked === 'Beginner' ? 'checked' : 'unchecked' }
        onPress={() => setLevel('Beginner')}
      />
      <RadioButton
        value="Intermediate"
        status={ checked === 'Intermediate' ? 'checked' : 'unchecked' }
        onPress={() => setLevel('Intermediate')}
      />
      <RadioButton
        value="Advanced"
        status={ checked === 'Advanced' ? 'checked' : 'unchecked' }
        onPress={() => setLevel('Advanced')}
      />

      {/*<TextInput*/}
      {/*  label="Intro"*/}
      {/*  placeholder="A few words to describe yourself..."*/}
      {/*  keyboardType="default"*/}
      {/*  mode="contained"*/}
      {/*  value={intro}*/}
      {/*  onChangeText={setIntro}*/}
      {/*  style={{marginBottom:10, width:"95%"}}*/}
      {/*  // left={<TextInput.Icon name="email"/>}*/}
      {/*/>*/}

      <TextInput
        label="Place"
        placeholder="MacRitchie Reservoir, ..."
        mode="contained"
        value={place}
        onChangeText={setPlace}
        style={{marginBottom:10, width:"95%"}}
        // left={<TextInput.Icon name="email"/>}
      />

      {/*  Pick dates */}
        {daysInWeek.map(item => {
            return (
              <View style={{
                margin: 5,
                flexWrap: 'wrap',
              }}>
                <Chip
                  mode="outlined" // changing display mode, default is flat
                  height={30} //give desirable height to chip
                  textStyle={{ color:'white', fontSize: 15 }} //label properties
                  style={{ backgroundColor: "blue" }}
                  onPress={() => console.log('Clicked chip '+ item)}>
                  { item }
                </Chip>
              </View>
            );
          })
        }


        <Checkbox.Item
        label="Mon"
        status={date[0] ? 'checked' : 'unchecked'}
        onPress={() => {
          setDate(() => {date[0] = !date[0]});
        }}
        mode="android"
      />
        <Checkbox.Item
          label="Tue"
          status={date[1] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[1] = !date[1]});
          }}
          mode="android"
        />
        <Checkbox.Item
          label="Wed"
          status={date[2] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[2] = !date[2]});
          }}
          mode="android"
        />
        <Checkbox.Item
          label="Thu"
          status={date[3] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[3] = !date[3]});
          }}
          mode="android"
        />
        <Checkbox.Item
          label="Fri"
          status={date[4] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[4] = !date[4]});
          }}
          mode="android"
        />
        <Checkbox.Item
          label="Sat"
          status={date[5] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[5] = !date[5]});
          }}
          mode="android"
        />
        <Checkbox.Item
          label="Sun"
          status={date[6] ? 'checked' : 'unchecked'}
          onPress={() => {
            setDate(() => {date[6] = !date[6]});
          }}
          mode="android"
        />

      <Button
        mode="contained"
        // onPress={ () => navigation.dispatch(CommonActions.reset({
        //     index: 0,
        //     routes: [{
        //       name: "Home",
        //       // params: { name: user.displayName }
        //       }]
        //     })
        //     )
        // }
        onPress={handleSetUpProfile}
        style={styles.button}
      >Finish
      </Button>

        </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
    color:"#05668D"
  },
  button: {
    // width:"70%",
    // borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: "center",
    justifyContent: 'center',
  },
});
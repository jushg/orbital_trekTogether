import React, {useState, useContext}  from 'react';
import { StyleSheet,Text, Image, View, ScrollView} from 'react-native'
import {Button, RadioButton, TextInput, Chip, Avatar } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";

import Screen from "../component/screen"
import * as Setup from "../../api/setup";
import {UserContext} from "../feature/auth"

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

  const userAPI = useContext(UserContext);

  // callback function when user presses 'Finish' to set up their profile
  const handleSetUpProfile = async () => {
     Setup.setUpProfile({age, level, place, date, avatar},
      () => {
        console.log("Success")
        // console.log(userAPI.user)
        userAPI.changeUserState();
        // setTimeout(() => console.log(userAPI.user), 5000);
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

  // state & callback function to handle user's avatar picking
  const [avatar, setAvatar] = useState(null);
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

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      console.log(pickerResult);
      setAvatar({ uri: pickerResult.uri });
      console.log(`avatar is null? ${avatar == null}`);
    }
  };

  return (
    <Screen style={styles.container} >
      <ScrollView style={{paddingHorizontal: 15}}>

        <Text style={styles.title}>Set up your Profile</Text>
        <View style={{alignItems: "center"}}>
          <Avatar.Image
            size={105}
            source={
              avatar !== null
                ? ({ uri: avatar.uri })
                : require('../../assets/ava1.jpg')
            }
            style={{marginTop: 10}}
          />
          <Button icon="camera" mode="contained" onPress={handlePickImage} style={styles.button}>
            Add profile picture
          </Button>
        </View>

        <TextInput
          label="Age"
          placeholder="25"
          keyboardType="numeric"
          mode="contained"
          value={age}
          onChangeText={setAge}
          style={{marginBottom:10, width:"95%"}}
          // left={<TextInput.Icon name="email"/>}
        />

        <RadioButton.Item
          label="Beginner"
          value="Beginner"
          status={ level === 'Beginner' ? 'checked' : 'unchecked' }
          onPress={() => setLevel('Beginner')}
        />
        <RadioButton.Item
          label="Intermediate"
          value="Intermediate"
          status={ level === 'Intermediate' ? 'checked' : 'unchecked' }
          onPress={() => setLevel('Intermediate')}
        />
        <RadioButton.Item
          label="Advanced"
          value="Advanced"
          status={ level === 'Advanced' ? 'checked' : 'unchecked' }
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
          {daysInWeek.map((item, index) => {
              return (
                <View style={{
                  margin: 5,
                  flexWrap: 'wrap',
                }} key={index}>
                  <Chip
                    key={index}
                    mode="outlined" // changing display mode, default is flat
                    height={30} // give desirable height to chip
                    textStyle={{ color:'black', fontSize: 15 }} //label properties
                    // style={{ backgroundColor: "gray" }}
                    selected={date[index]}
                    selectedColor="green"
                    onPress={() => {
                      let newDate = [...date];
                      newDate[index] = !newDate[index];
                      setDate(newDate);
                      console.log('Clicked chip '+ item)
                    }}
                  >
                    { item }
                  </Chip>
                </View>
              );
            })
          }

          <Button mode="contained" onPress={handleSetUpProfile} style={styles.button}>
            Finish
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
    alignItems:"center",
    justifyContent:"center",
    marginVertical:10
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // alignItems: "center",
    // justifyContent: 'center',
  },
});
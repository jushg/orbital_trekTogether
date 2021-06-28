import React, {useState, useContext}  from 'react';
import { StyleSheet,Text, Image, View, ScrollView} from 'react-native'
import {Button, RadioButton, TextInput, Chip, Avatar, Headline, Subheading } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";

import Screen from "../component/screen"
import * as Setup from "../../utils/setup";
import {UserContext} from "../../utils/context"
import TextBox from '../component/textbox'
import colorConst from '../constant/color';



export default ({navigation}) => {
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [about, setAbout] = useState("");
  // const [hobby, setHobby] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState([false, false, false, false, false, false, false]);
  const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const userAPI = useContext(UserContext);

  // callback function when user presses 'Finish' to set up their profile
  const handleSetUpProfile = async () => {
     showMessage({
       message: "Creating your account...",
       type: "info", duration: 1500, floating: true
     })
     Setup.setUpProfile({age, level, about, place, date, avatar},
      () => {
        // console.log("Success")
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

    let pickerResult = await ImagePicker.launchImageLibraryAsync({quality: 0.3});
    if (!pickerResult.cancelled) {
      // console.log(pickerResult);
      setAvatar({ uri: pickerResult.uri });
      // console.log(`avatar is null? ${avatar == null}`);
    }
  };

  return (
    <Screen style={styles.container} >
      <ScrollView style={{paddingHorizontal: 15}}>

        {/* <Text style={styles.title}>Set up your Profile</Text> */}
        
        <View style={{alignItems: "center"}}>
          <Avatar.Image
            size={105}
            source={
              avatar !== null
                ? ({ uri: avatar.uri })
                : require('../../assets/account-icon.png')
            }
            style={{marginTop: 10}}
          />
          <Button icon="camera" mode="contained" onPress={handlePickImage} style={styles.button}>
            Add profile picture
          </Button>
        </View>
        
        <Subheading style={styles.title}>AGE</Subheading>
        <TextBox
          placeholder="Just a number"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          // left={<TextInput.Icon name="email"/>}
        /> 
        <View style={{justifyContent:"center"}} >
        <Subheading style={styles.title}>LEVEL</Subheading>
        {/* <RadioButton.Item
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
        /> */}
          <RadioButton.Group onValueChange={newLevel => setLevel(newLevel)} value={level}>
            <RadioButton.Item label="Beginner" value="Beginner" color={colorConst.backgroundCard} />
            <RadioButton.Item label="Intermediate" value="Intermediate" color={colorConst.accentLight} />
            <RadioButton.Item label="Advanced" value="Advanced" color={colorConst.accent}/>
          </RadioButton.Group>
        </View>

        <Headline style={styles.title}>About you</Headline>
        <TextBox
          label="About"
          placeholder="A few words to describe yourself..."
          value={about}
          onChangeText={setAbout}
          style={{marginBottom:10, height: 120}}
          multiline={true}
          // left={<TextInput.Icon name="email"/>}
        />

        <Subheading style={styles.title}>DESTINATION PREFERRENCE</Subheading>
        <TextBox
          label="Places"
          placeholder="Somewhere nice, somewhere nicer,..."
          value={place}
          multiline={true}
          onChangeText={setPlace}
          style={{marginBottom:10, height: 120}}
          // left={<TextInput.Icon name="email"/>}
        />

        {/*  Pick dates */}
        <Subheading style={styles.title}>AVAILABILITY</Subheading>
        <View style={{flex: 1}}>
        {daysInWeek.map((item, index) => {
          return (
            <View
            style={{ margin: 5,flexWrap: 'wrap'}}
            key={index}
            >
              <Chip
                key={index}
                mode="outlined" // changing display mode, default is flat
                height={30} // give desirable height to chip
                textStyle={{ color:'black', fontSize: 15 }} //label properties
                // style={{ backgroundColor: "gray" }}
                selected={date[index]}
                selectedColor= {colorConst.accent}
                onPress={() => {
                  let newDate = [...date];
                  newDate[index] = !newDate[index];
                  setDate(newDate);
                  console.log('Clicked chip '+ item)
                }}> { item }
              </Chip>
            </View>
          );
            })
          }
        </View>
        <View style={{alignItems:"center"}}>
          <Button mode="contained" onPress={handleSetUpProfile} style={[styles.button,{width: "40%"}]}>
            Finish
          </Button>
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {  
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  button: {
    borderRadius:25,
    marginVertical:20
  },
  container: {
    // flex: 1,
    // flexDirection:"column",
    // alignItems: "center",
    justifyContent: 'flex-start',
  },
});
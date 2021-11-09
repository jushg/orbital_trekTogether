import React, {useState, useContext}  from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, RadioButton, Chip, Avatar, Subheading, Divider } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

import Screen from "../component/screen"
import * as Profile from "../../utils/profile";
import {UserContext} from "../../utils/context"
import { handlePickImage } from "../../utils/imagepicker";
import TextBox from '../component/textbox'
import colorConst from '../constant/color';
import PlaceSearch from "../component/placeSearch"


export default ({navigation}) => {
  const [avatar, setAvatar] = useState(null);
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState([]);
  const [date, setDate] = useState([false, false, false, false, false, false, false]);
  const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const userAPI = useContext(UserContext);

  const handleSetUpProfile = async () => {
    showMessage({
       message: "Setting up your profile...",
       type: "info", duration: 1500, floating: true
     })
    Profile.setUpProfile({age, level, about, place, date, avatar},
      () => {
        userAPI.changeUserState();
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

  const handlePickAvatar = () => {
    handlePickImage(0.3)
      .then(uri => setAvatar(uri));
  };

  return (
    <Screen style={styles.container} >
      <ScrollView keyboardShouldPersistTaps={"handled"} style={{paddingHorizontal: 15}}>
        <View style={{alignItems: "center"}}>
          <Avatar.Image
            size={105}
            source={
              avatar !== null
                ? ({ uri: avatar })
                : require('../../assets/account-icon.png')
            }
            style={{marginTop: 10}}
          />
          <Button icon="camera" mode="contained" onPress={handlePickAvatar} style={styles.button}>
            Add profile picture
          </Button>
        </View>
        
        <Subheading style={styles.title}>AGE</Subheading>
        <TextBox
          placeholder="Just a number"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Subheading style={styles.title}>LEVEL</Subheading>
        <View style={{justifyContent:"center", borderWidth: 1, borderRadius: 10, backgroundColor:colorConst.secondaryLight}} >
          <RadioButton.Group onValueChange={newLevel => setLevel(newLevel)} value={level}>
            <RadioButton.Item label="Beginner" value="Beginner" color={colorConst.backgroundCard} />
            <Divider style={{backgroundColor:"black"}}/>
            <RadioButton.Item label="Intermediate" value="Intermediate" color={colorConst.accentLight} />
            <Divider style={{backgroundColor:"black"}}/>
            <RadioButton.Item label="Advanced" value="Advanced" color={colorConst.accent}/>
          </RadioButton.Group>
        </View>

        <Subheading style={styles.title}>ABOUT YOU</Subheading>
        <TextBox
          label="About"
          placeholder="A few words to describe yourself..."
          value={about}
          onChangeText={setAbout}
          style={{marginBottom:10, height: 120}}
          multiline={true}
        />

        <Subheading style={styles.title}>DESTINATION PREFERENCES</Subheading>
        <PlaceSearch place={place} setPlace={setPlace} textPlaceHolder='Where do you want to visit?' />

        <Subheading style={styles.title}>AVAILABILITY</Subheading>
        <View style={{marginBottom: 3, flexWrap: 'wrap', flexDirection:"row" }}>
        {daysInWeek.map((item, index) => {
          return (
            <View
            style={{marginHorizontal:2,marginVertical:3 }}
            key={index}
            >
              <Chip
                key={index}
                mode="flat" // changing display mode, default is flat
                height={30} // give desirable height to chip
                textStyle={{ color:'black', fontSize: 15 }} // label properties
                // style={{ backgroundColor: colorConst.secondaryDark }}
                selected={date[index]}
                style={{ backgroundColor: colorConst.secondaryLight ,borderColor:"black"}}
                selectedColor= {colorConst.primary}
                onPress={() => {
                  let newDate = [...date];
                  newDate[index] = !newDate[index];
                  setDate(newDate);
                  // console.log('Clicked chip '+ item)
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
    justifyContent: 'flex-start',
  },
});
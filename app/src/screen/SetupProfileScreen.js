import React, {useState, useContext}  from 'react';
import {StyleSheet, Text, Image, View, ScrollView, Keyboard} from 'react-native';
import {Button, RadioButton, TextInput, Chip, Avatar, Headline, Subheading, Divider } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Screen from "../component/screen"
import * as Profile from "../../utils/profile";
import {UserContext} from "../../utils/context"
import { handlePickImage } from "../../utils/imagepicker";
import TextBox from '../component/textbox'
import colorConst from '../constant/color';
import { MAPS_API_KEY } from "@env";
import PlaceSearch from "../component/placeSearch"

export default ({navigation}) => {
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState([]);
  const [date, setDate] = useState([false, false, false, false, false, false, false]);
  const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const userAPI = useContext(UserContext);

  // callback function when user presses 'Finish' to set up their profile
  const handleSetUpProfile = async () => {
     showMessage({
       message: "Setting up your profile...",
       type: "info", duration: 1500, floating: true
     })
     Profile.setUpProfile({age, level, about, place, date, avatar},
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
  const handlePickAvatar = () => {
    handlePickImage(0.3)
      .then(uri => setAvatar(uri));
  };

  return (
    <Screen style={styles.container} >
      <ScrollView keyboardShouldPersistTaps={"handled"} style={{paddingHorizontal: 15}}>

        {/* <Text style={styles.title}>Set up your Profile</Text> */}
        
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
          // left={<TextInput.Icon name="email"/>}
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
        {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >

        
        
        {place.map((item, index) => {
          return (
            <View
              style={{ marginHorizontal: 3, marginVertical: 3}}
              // key={item.place_id}
              key={index}
            >
              <Chip
                mode="flat"
                selected={false}
                height={30}
                textStyle={{ color:'black', fontSize: 15 }}
                style={{ backgroundColor: colorConst.secondaryDark, borderColor:"black"}}
                // selectedColor= {colorConst.accent}
                onClose={() => {
                  let newPlace = [...place];
                  newPlace.splice(index, 1);
                  setPlace(newPlace);
                  console.log('Delete place '+ item.description)
                }}>
                { item.structured_formatting.main_text }
              </Chip>
            </View>
          );
        })}
        </View>

        <GooglePlacesAutocomplete
          placeholder='Search for a place...'
          debounce={1000}     // delay after typing to call API
          multiline={false}
          // fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const arr = [...place, data];
            setPlace(arr);
            // console.log(data, details);
          }}
          // returnKeyType="search"
          onEndEditing={Keyboard.dismiss}
          onFail={console.error}
          onNotFound={console.error}
          query={{
            key: MAPS_API_KEY,
            language: 'en',
            components: 'country:sg',
          }}
          textInputProps={{   // props for react native's TextInput, not rn paper!
            clearTextOnFocus: true,     // ios only
            backgroundColor: colorConst.secondaryLight,
            clearButtonMode: "always", //ios only ?
            style: {
              width: "100%",
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginVertical: 3
            }
          }}
          // suppressDefaultStyles={true}
          enablePoweredByContainer={false}
          // isRowScrollable={false}
        /> */}
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
                textStyle={{ color:'black', fontSize: 15 }} //label properties
                // style={{ backgroundColor: colorConst.secondaryDark }}
                selected={date[index]}
                style={{ backgroundColor: colorConst.secondaryLight ,borderColor:"black"}}
                selectedColor= {colorConst.primary}
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
    justifyContent: 'flex-start',
  },
});
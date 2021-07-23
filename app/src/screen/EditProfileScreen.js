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

import * as Profile from "../../utils/profile";
import TextBox from "../component/textbox";
import PlaceSearch from "../component/placeSearch";
import Screen from "../component/screen";
import {UserContext} from "../../utils/context";
import {handlePickImage} from "../../utils/imagepicker";
import colorConst from "../constant/color";


export default ({navigation}) => {
  const currUser = useContext(UserContext).user;
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [age, setAge] = useState(null);
  const [level, setLevel] = useState(null);
  const [about, setAbout] = useState(null);
  const [place, setPlace] = useState(null);
  const [date, setDate] = useState(null);
  const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    Profile.getCurrentUserData(currUser.uid)
      .then(user => {
        setAvatar(user.photoURL);
        setAge(user.age.toString());
        setLevel(user.level);     // convert to "Beginner", ...
        setAbout(user.about);
        setPlace(user.place.map(item => {
          return {structured_formatting: {main_text: item}};
        }));
        setDate(user.date);
        setIsLoading(false);
      });
  }, [])

  const handlePickAvatar = () => {
    handlePickImage(0.3)
      .then(uri => {
        if (uri != null) {
          setAvatar(uri);
          setIsAvatarChanged(true);
        }
      });
  };

  const handleUpdateProfile = () => {
    showMessage({
      message: "Updating your profile...\nThis might take a while",
      type: "info", duration: 1600, floating: true
    })
    Profile.updateProfile({currUser, age, level, about, place, date, avatar, isAvatarChanged},
      () => {
        navigation.navigate("Setting");
      },
      (error) => {showMessage({
        message: error,
        type: "warning",
        duration: 1600,
        floating: true,
      });
      }
    )
  };

  if (isLoading) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <Screen style={styles.container} >
      <ScrollView keyboardShouldPersistTaps={"handled"} style={{paddingHorizontal: 15}}>
        <View style={{alignItems: "center"}}>
          <Avatar.Image
            size={105}
            source={{uri: avatar}}
            style={{marginTop: 10}}
          />
          <Button icon="camera" mode="contained" onPress={handlePickAvatar} style={styles.button}>
            Change profile picture
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
          <RadioButton.Group onValueChange={newLevel => {
            console.log("Level " + newLevel);
            setLevel(newLevel);
          }} value={level}>
            <RadioButton.Item label="Beginner" value={1} color={colorConst.backgroundCard} />
            <Divider style={{backgroundColor:"black"}}/>
            <RadioButton.Item label="Intermediate" value={2} color={colorConst.accentLight} />
            <Divider style={{backgroundColor:"black"}}/>
            <RadioButton.Item label="Advanced" value={3} color={colorConst.accent}/>
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
          autoCorrect={false}
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
                  textStyle={{ color:'black', fontSize: 15 }} //label properties
                  // style={{ backgroundColor: colorConst.secondaryDark }}
                  selected={date[index]}
                  style={{ backgroundColor: colorConst.secondaryLight ,borderColor:"black", elevation: 2}}
                  selectedColor= {colorConst.primary}
                  onPress={() => {
                    let newDate = [...date];
                    newDate[index] = !newDate[index];
                    setDate(newDate);
                  }}> { item }
                </Chip>
              </View>
            );
          })
          }
        </View>
        <View style={{alignItems:"center"}}>
          <Button mode="contained" onPress={handleUpdateProfile} style={[styles.button,{width: "40%"}]}
                  // disabled
          >
            Finish
          </Button>
        </View>
      </ScrollView>
    </Screen>
  )
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
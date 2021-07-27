import React, {useEffect, useState, useContext, useLayoutEffect} from "react";
import {
  Alert,
  Image, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import {ActivityIndicator, Avatar, Card, Caption, Paragraph, IconButton} from "react-native-paper";
import Carousel from "react-native-snap-carousel";

import * as Trip from "../../utils/trip";
import { UserContext } from "../../utils/context";
import firebase from "../../utils/firebase";
import colorConst from "../constant/color";
import CarouselPhotoCard from "../component/CarouselPhotoCard";

export default ({navigation, route}) => {

  const sliderWidth = useWindowDimensions().width;
  const itemWidth = sliderWidth * 0.96;
  const itemHeight = itemWidth * 9/16;

  const {trip, otherName} = route.params;
  const {user} = useContext(UserContext);
  const [journal, setJournal] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const buddyID = trip.members.length === 1
    ? null
    : ( trip.members[0] === user.uid ? trip.members[1] : trip.members[0] );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon={'delete'} onPress={onPressDelete} size={27} color={colorConst.textHeader} />
      )
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribeJournalListener = firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .onSnapshot(doc => {
        const data = doc.data();
        setJournal(data);
        if (data.photos.length > 0) setThumbnailUrl(data.photos[data.photos.length - 1]);
      });

    return () => unsubscribeJournalListener();
  }, []);

  const onPressDelete = async () => {
    await Trip.deleteTrip(trip.id, buddyID, user.displayName);
    navigation.navigate("Past");
  };

  const onPressThumbnail = () => {
    if (thumbnailUrl)
      navigation.navigate("Photo Carousel", {'photos': journal.photos});
  }

  const onPressPhotos = () => {
    navigation.navigate("Edit Photos", {trip: trip})
  }

  const onPressText = () => {
    navigation.navigate("Edit Text", {trip: trip})
  }

  return (
    <>
    {journal == null
      ?
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black"/>
      </View>
      :
      <>
        {/*<Portal>*/}
        {/*  <Modal*/}
        {/*    visible={selectedItem}*/}
        {/*    onDismiss={() => setSelectedItem(null)}*/}
        {/*    contentContainerStyle={{...styles.modal, width: modalWidth, height: modalHeight}}*/}
        {/*  >*/}
        {/*    <Pressable onLongPress={longPress}>*/}
        {/*      <Image source={{ uri: selectedItem }}*/}
        {/*             resizeMode={'contain'}*/}
        {/*             style={{width: modalWidth, height: modalHeight}}*/}
        {/*      />*/}
        {/*    </Pressable>*/}
        {/*  </Modal>*/}
        {/*</Portal>*/}


      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title={trip.routeName?trip.routeName:trip.place}
            titleStyle={{color:colorConst.accent}}
            subtitle={trip.date.toDate().toLocaleDateString()}
            subtitleNumberOfLines={4}
            right={(props) => {
              if (trip.members.length === 2)
                return (
                  <View style={{justifyContent:'center', padding:'0.5%'}}>
                    <Avatar.Image {...props} size={50} source={{uri: trip.otherAvatarURL[user.uid]}}/>
                  </View>
                );
            }}
            />
            <Card.Content>
              <Paragraph>{otherName ? otherName : "Solo trip"}</Paragraph>
              <Caption style={{fontStyle: 'italic', color: 'green'}}>Latest update: {journal.lastEditedBy}</Caption>
            </Card.Content>
          </Card>


        {/* <Title> {trip.routeName?trip.routeName:trip.place}</Title>
        <Subheading>{trip.date.toDate().toLocaleDateString()}</Subheading>
        <Subheading>{otherName ? "Buddy: " + otherName : "Solo trip"}</Subheading>
        <Caption style={{fontStyle: 'italic', color: 'green'}}>Latest update: {journal.lastEditedBy}</Caption> */}

        {/*<Carousel */}
        {/*  data={journal.photos}*/}
        {/*  renderItem={foo}*/}
        {/*  itemWidth={itemWidth}*/}
        {/*  sliderWidth={sliderWidth}*/}
        {/*/>*/}


        {/*<TouchableOpacity*/}
        {/*  style={{*/}
        {/*    ...styles.thumbnailContainer,*/}
        {/*    width: itemWidth,*/}
        {/*    height: itemHeight,*/}
        {/*  }}*/}
        {/*  disabled={!thumbnailUrl}*/}
        {/*  onPress={() => navigation.navigate("Photo Carousel", {'photos': journal.photos})}*/}
        {/*  activeOpacity={0.8}*/}
        {/*>*/}
        {/*  { thumbnailUrl*/}
        {/*  ? <Image*/}
        {/*    // source={require("../.. <Card>
        <Card.Title
          title={trip.routeName?trip.routeName:trip.place}
          subtitle={trip.date.toDate().toLocaleDateString()}
          subtitleNumberOfLines={4}
          // right={(props) => {
          //   if (hasBuddy)
          //     return (
          //       <View st<Card.Actions>
            <IconButton icon="camera" onPress={onPressPhotos}/>
          </Card.Actions>yle={{justifyContent:'center', padding:'0.5%'}}>
          //         <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}}/>
          //       </View>
          //     );
          // }}
          />
        <Card.Content>
          <Paragraph>{otherName ? "Buddy: " + otherName : "Solo trip"}</Paragraph>
          <Caption style={{fontStyle: 'italic', color: 'green'}}>Latest update: {journal.lastEditedBy}</Caption>
          <Paragraph>{trip.notes}</Paragraph>
        </Card.Content>
        </Card>/assets/ava1.jpg")}*/}
        {/*    source={{ uri: thumbnailUrl }}*/}
        {/*    resizeMode={'cover'}*/}
        {/*    style={{width: itemWidth, height: itemHeight}}*/}
        {/*  />*/}
        {/*  : <Text style={{color: 'black', fontSize: 16}}>You haven't uploaded any photos yet!</Text>*/}
        {/*  }*/}
        {/*</Touc/IconButton>hableOpacity>*/}
        {/*<Text style={styles.thumbnailCaption}>Click the above image to view photos</Text>*/}

        <Card onPress={onPressThumbnail} style={styles.card} >
          <Card.Title
            title="Your photos"
            subtitle={thumbnailUrl?"":"You have no photos yet!"}
            right={() => <IconButton icon="camera-plus-outline" onPress={onPressPhotos} size={25}/>}
          />
          {thumbnailUrl &&
          <Card.Cover
            source={{uri: thumbnailUrl}}
            resizeMode={'cover'}
            style={{ margin: "1%", borderWidth: 1, height:itemHeight, width:itemWidth}}
          />
          }
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Your notes"
            right={() => <IconButton icon="pencil-outline" onPress={onPressText} size={25}/>}
          />
          <Card.Content>
            <Paragraph style={styles.textBox}>{journal.text? journal.text: "No notes yet"}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      </>
    }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colorConst.background
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 5,
    borderWidth:0.75,
    margin:"1%",
  },
  thumbnailContainer: {
    overflow: 'hidden',  // (?)
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: colorConst.secondaryLight,
    borderColor: colorConst.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailCaption: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'green',
    marginBottom: 5
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  textBox: {
    borderColor:"black",
    padding:'2%',
    borderRadius: 5,
    borderWidth:0.75,
    elevation:5,
    backgroundColor: colorConst.secondaryLight
  }
});
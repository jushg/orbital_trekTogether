import React, {useEffect, useState} from "react";
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
import {ActivityIndicator, Portal, Modal, Card, Caption, Paragraph, Subheading} from "react-native-paper";
import Carousel from "react-native-snap-carousel";

import firebase from "../../utils/firebase";
import colorConst from "../constant/color";
import CarouselPhotoCard from "../component/CarouselPhotoCard";

export default ({navigation, route}) => {

  const sliderWidth = useWindowDimensions().width;
  const itemWidth = sliderWidth - 2 * styles.container.padding;
  const itemHeight = itemWidth * 9/16;

  const [selectedItem, setSelectedItem] = useState(null);
  const modalHeight = useWindowDimensions().height * 3/5;
  const modalWidth = useWindowDimensions().width * 9/10;

  const longPress = () => {
    Alert.alert(
      'Long press?',
      'Should delete...',
      [
        { text: "No", style: 'cancel', onPress: () => {} },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {},
        },
      ]
    );
  }
  const foo = ({item, index}) => {
    // console.log("render " + index + " view");
    return <CarouselPhotoCard item={item} onPress={setSelectedItem} />;
  }

  const trip = route.params.trip;
  const otherName = route.params.otherName;

  const [journal, setJournal] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
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

  const onPressThumbnail = () => {
    if (thumbnailUrl)
      navigation.navigate("Photo Carousel", {'photos': journal.photos});
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
        <Subheading>Place: {trip.place}</Subheading>
        <Subheading>{otherName ? "Buddy: " + otherName : "Solo trip"}</Subheading>
        <Caption style={{fontStyle: 'italic', color: 'green'}}>Latest update: {journal.lastEditedBy}</Caption>

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
        {/*    // source={require("../../assets/ava1.jpg")}*/}
        {/*    source={{ uri: thumbnailUrl }}*/}
        {/*    resizeMode={'cover'}*/}
        {/*    style={{width: itemWidth, height: itemHeight}}*/}
        {/*  />*/}
        {/*  : <Text style={{color: 'black', fontSize: 16}}>You haven't uploaded any photos yet!</Text>*/}
        {/*  }*/}
        {/*</TouchableOpacity>*/}
        {/*<Text style={styles.thumbnailCaption}>Click the above image to view photos</Text>*/}

        <Card
          onPress={onPressThumbnail}
          style={styles.card}
        >
          {thumbnailUrl ?
            <Card.Cover
              source={{uri: thumbnailUrl}}
              resizeMode={'cover'}
              style={{width: itemWidth, height: itemHeight}}
            />
            : <Card.Title title="No photos yet!"/>
          }
        </Card>

        <Paragraph style={styles.textBox}>{journal.text}</Paragraph>

      </ScrollView>
      </>
    }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  card: {
    marginTop: 10,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 5
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
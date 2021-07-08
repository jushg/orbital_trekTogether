import React, {useEffect, useState} from "react";
import {
  Alert, FlatList,
  Image, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View
} from "react-native";
import {ActivityIndicator, Portal, Modal, Button} from "react-native-paper";
import Carousel from "react-native-snap-carousel";

import firebase from "../../utils/firebase";
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

    // return (
    //   <Pressable style={styles.card}
    //              onPress={() => setSelectedItem(item)}
    //   >
    //     <Image source={{ uri: item }}
    //            resizeMode={'contain'}
    //            style={{width: itemWidth, height: itemHeight}}
    //     />
    //   </Pressable>
    // )

    // if (item === 1) {
    //   return (
    //     <Pressable style={styles.card}
    //                onPress={() => showModal(item)}
    //     >
    //       <Image source={require("../../assets/ava1.png")}
    //              resizeMode={'contain'} style={{width: itemWidth, height: itemHeight}}/>
    //     </Pressable>
    //   )
    // }
    // if (item === 2) {
    //   return (
    //     <TouchableOpacity style={styles.card}
    //                       onLongPress={() => alert("Long press")}
    //     >
    //       <Image source={require("../../assets/business_cat.png")}
    //              resizeMode={'contain'} style={{width: itemWidth, height: itemHeight}}/>
    //     </TouchableOpacity>
    //   )
    // }
    // if (item === 3) {
    //   return (
    //     <TouchableOpacity style={styles.card}>
    //       <Image source={require("../../assets/pain.jpg")}
    //              resizeMode={'contain'}
    //              style={{width: itemWidth, height: itemHeight}}/>
    //     </TouchableOpacity>
    //   )
    // }
    // if (item === 4) {
    //   return (
    //     <TouchableOpacity style={styles.card}>
    //       <Image source={require("../../assets/account-icon.png")}
    //              resizeMode={'contain'}
    //              style={{width: itemWidth, height: itemHeight}}/>
    //     </TouchableOpacity>
    //   )
    // }
    // if (item === 5) {
    //   return (
    //     <TouchableOpacity style={styles.card}>
    //         <Image source={require("../../assets/splash.png")}
    //                resizeMode={'contain'}
    //                style={{width: itemWidth, height: itemHeight}}/>
    //     </TouchableOpacity>
    //   )
    // }
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
        <Text>Place: {trip.place}</Text>
        <Text>{otherName ? "Buddy: " + otherName : "Solo trip"}</Text>
        <Text style={{fontStyle: 'italic', color: 'green'}}>Last edited by: {journal.lastEditedBy}</Text>

        {/*<Carousel */}
        {/*  data={journal.photos}*/}
        {/*  renderItem={foo}*/}
        {/*  itemWidth={itemWidth}*/}
        {/*  sliderWidth={sliderWidth}*/}
        {/*/>*/}

        {/* CONSIDER USING Pressable */}
        <TouchableHighlight
          style={{
            ...styles.thumbnailContainer,
            width: itemWidth,
            height: itemHeight,
            backgroundColor: 'silver'
          }}
          underlayColor={'gray'}
          disabled={!thumbnailUrl}
          onPress={() => navigation.navigate("Journal Photos", {'photos': journal.photos})}
        >
          { thumbnailUrl
          ? <Image
            // source={require("../../assets/ava1.jpg")}
            source={{ uri: thumbnailUrl }}
            resizeMode={'contain'}
            style={{width: itemWidth, height: itemHeight}}
          />
          : <Text style={{color: 'white', fontSize: 16}}>You haven't uploaded any photos yet!</Text>
          }
        </TouchableHighlight>
        <Text style={styles.thumbnailCaption}>Click the above image to view photos</Text>

        <Text>{journal.text}</Text>

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
  thumbnailContainer: {
    // overflow: 'hidden',  // (?)
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailCaption: {
    alignSelf: 'center',
    fontStyle: 'italic',
    color: 'green',
    marginBottom: 5
  },
  card: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'green',
    backgroundColor: 'gray'
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'center'
  }
});
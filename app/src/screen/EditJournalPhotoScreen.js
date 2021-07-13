import React, {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {FlatList, StyleSheet, useWindowDimensions, View} from "react-native";
import {ActivityIndicator, Button, IconButton} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import firebase from "../../utils/firebase";
import * as Journal from "../../utils/journal";
import { handlePickImage } from "../../utils/imagepicker";
import {UserContext} from "../../utils/context";
import SelectablePhotoTile from "../component/SelectablePhotoTile";

export default ({navigation, route}) => {

  const maxPhotoWidth = 120;
  const numColumns = Math.ceil(useWindowDimensions().width / maxPhotoWidth);
  const photoWidth = useWindowDimensions().width / numColumns;

  const trip = route.params.trip;
  const [photos, setPhotos] = useState(null);
  const photosAdded = useRef(new Set());     // local uri of added photos
  let photosSelected = useRef(new Set());     // uri of currently selected photos
  const toBeDeleted = useRef([]);     // uri of remote photos to be deleted

  useEffect(() => {
    firebase.firestore()
      .collection('journals')
      .doc(trip.id)
      .get()
      .then(doc => {
        const obj = {};
        doc.data().photos.map(i => obj[i] = {uri: i, selected: false, origin: "remote"});
        setPhotos(obj);
      });
  }, []);


  const onSelection = useCallback(
    (isSelected, uri) => {
      isSelected
        ? photosSelected.current.add(uri)
        : photosSelected.current.delete(uri);
      console.log("tick total: " + photosSelected.current.size);
    },
    [photosSelected.current]
  );
  const renderItem = ({item, index}) => {
    return (
      <View style={[ { borderColor: 'black'},
                    index % numColumns === 0 ? {borderRightWidth: 1} :
                    index % numColumns === numColumns-1 ? {borderLeftWidth: 1} :
                      {borderRightWidth: 1, borderLeftWidth: 1} ]} >
        <SelectablePhotoTile
          uri={item.uri}
          photoWidth={photoWidth}
          selected={item.selected}
          onSelection={onSelection}
        />
      </View>
    )
  }

  const renderSeparator = () => (
    <View style={{backgroundColor: 'black', height: 2}}/>
  );

  const handlePickPhoto = async () => {
    const uri = await handlePickImage(0.25);
    if (uri == null) return;
    const newObj = {...photos};
    newObj[uri] =
      {
        uri: uri,    // local uri
        selected: false,
        origin: "local"
      }
    ;
    setPhotos(newObj);
    photosAdded.current.add(uri);
    photosSelected.current.clear();
  };

  const handlePressDelete = () => {
    const newObj = {...photos};
    for (const uri of photosSelected.current.values()) {
      if (photos[uri].origin === 'local') {
        photosAdded.current.delete(uri);
      } else {
        // keep track of remote photos to be deleted in Firebase
        toBeDeleted.current.push(uri);
      }
      delete newObj[uri];
    }
    setPhotos(newObj);
    photosSelected.current.clear();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row-reverse'}}>
          <IconButton icon={'plus'} size={24} onPress={handlePickPhoto} />
          <IconButton icon={'delete'} size={24} onPress={handlePressDelete} />
        </View>
      ),
    });
  }, [navigation, photos, photosAdded, photosSelected, toBeDeleted]);

  const {user} = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      const promises = [
        Journal.uploadManyPhotos(trip.id, user.displayName, Array.from(photosAdded.current)),
        Journal.deleteManyPhotos(trip.id, user.displayName, toBeDeleted.current)
      ];
      Promise.all(promises)
        .then(res => {
          console.log(res);
          navigation.dispatch(e.data.action);
        });
    });
    return () => unsubscribe();
  }, [])


  return (
    <>
    {photos == null
      ?
      <View style={styles.loadingContainer}>
        <ActivityIndicator/>
      </View>
      :
      <>
        {/*<View style={{flexDirection: 'row-reverse'}}>*/}
        {/*  <IconButton icon={'plus'} size={24} onPress={handlePickPhoto} />*/}
        {/*  <IconButton icon={'delete'} size={24} onPress={handlePressDelete} />*/}
        {/*</View>*/}
        <FlatList
          data={Object.values(photos)}
          renderItem={renderItem}
          numColumns={numColumns}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={item => item.uri}
          // contentContainerStyle={styles.container}
        />
      </>
    }
    </>
  )
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
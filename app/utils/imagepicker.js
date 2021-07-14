import React from "react";
import * as ImagePicker from "expo-image-picker";
import firebase from "./firebase";

let hasCameraRollPermission = false;
export const handlePickImage = async (quality) => {
  if (!hasCameraRollPermission) {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Please enable access permission for camera roll!');
      return;
    }
    else hasCameraRollPermission = true;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({quality: quality});
  if (!pickerResult.cancelled) {
    return pickerResult.uri;
  }
  return null;
};

export const uploadImage = async (docID, uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = firebase.storage().ref().child(
      docID + "/" + uri.substr(uri.indexOf('ImagePicker/'))
    );
    await fileRef.put(blob);
    return await fileRef.getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

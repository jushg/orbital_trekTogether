import React from "react";
import * as ImagePicker from "expo-image-picker";

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
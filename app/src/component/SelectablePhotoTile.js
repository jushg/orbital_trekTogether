import React, {useState} from "react";
import {Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import * as ImageCache from "react-native-expo-image-cache";

const SelectablePhotoTile = (props) => {
  const {uri, photoWidth, selected, onSelection} = props;

  const [isSelected, setIsSelected] = useState(selected);

  const toggleSelected = () => {
    onSelection(!isSelected, uri);
    setIsSelected(!isSelected);
  }

  const renderSelectionButton = () => {
    let icon = require("../../assets/small-selected-off.png");
    if (isSelected) {
      icon = require("../../assets/small-selected-on.png");
    }

    return (
      <TouchableWithoutFeedback onPress={toggleSelected}>
        <Image
          source={icon}
          style={styles.selectionIcon}
          resizeMode={"contain"}
        />
      </TouchableWithoutFeedback>
    );
  }

  // let c = 1;
  // console.log("render tile " + c)
  // c++;
  return (
    <View style={{}}>
      <Image
        // uri={uri}
        source={{uri: uri}}
        resizeMode={"cover"}
        style={{width: photoWidth-1, height: photoWidth-1}}
      />
      {isSelected ? <View style={styles.overlay}/> : null}
      {renderSelectionButton()}
    </View>
  )
};

const styles = StyleSheet.create({
  selectionIcon: {
    position: 'absolute',
    // top: 3,
    right: 3,
    width: 25
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

const compareComponent = (prev, next) => {
  return prev.uri === next.uri;
}

export default React.memo(SelectablePhotoTile, compareComponent);
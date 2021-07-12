import React from "react";
import {Pressable, StyleSheet, useWindowDimensions} from "react-native";
import {Image} from "react-native-expo-image-cache";

const CarouselPhotoCard = ({item, onPress}) => {
  const windowWidth = useWindowDimensions().width;
  const cardWidth = windowWidth - 2 * styles.container.padding;
  const cardHeight = cardWidth * 9/16;

  console.log("render new component");

  return (
    <Pressable style={styles.card}
               onPress={() => onPress(item)}
    >
      <Image
        uri={item}
        resizeMode={'contain'}
        style={{width: cardWidth, height: cardHeight}}
      />
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
});

let count = 1;
const compareProps = (prev, next) => {
  console.log(count);
  count++;
  return prev.item === next.item;
}

export default React.memo(CarouselPhotoCard, compareProps);
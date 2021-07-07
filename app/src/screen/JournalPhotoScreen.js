import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel from 'react-native-snap-carousel';
import * as Auth from "../../utils/auth";
import {Text} from "react-native-paper";

export default ({navigation, route}) => {
  const user = Auth.getCurrentUser();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // const data = [1,2,3,4,5,6];
  const data = [...route.params.photos].reverse();

  const renderItem = ({item, index}) => {
    // console.log(item);
    // if (item === 2) {
    //   return (
    //     <View style={styles.card}>
    //       <Image source={require("../../assets/business_cat.png")}
    //              resizeMode={'contain'} style={{width: windowWidth, height: windowHeight}}/>
    //     </View>
    //   )
    // }
    // if (item === 3) {
    //   return (
    //     <View style={styles.card}>
    //       <Image source={require("../../assets/pain.jpg")}
    //              resizeMode={'contain'}
    //              style={{width: windowWidth, height: windowHeight}}/>
    //     </View>
    //   )
    // }
    // if (item === 4) {
    //   return (
    //     <View style={styles.card}>
    //       <Image source={require("../../assets/ava1.png")}
    //              resizeMode={'contain'}
    //              style={{width: windowWidth, height: windowHeight}}/>
    //     </View>
    //   )
    // }
    // if (item === 5) {
    //   return (
    //     <View style={styles.card}>
    //         <Image source={require("../../assets/splash.png")}
    //                resizeMode={'contain'}
    //                style={{width: windowWidth, height: windowHeight}}/>
    //     </View>
    //   )
    // }

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item }}
          resizeMode={'contain'}
          style={{width: windowWidth, height: windowHeight}}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {data.length > 0
      ?
        // <Button onPress={() => navigation.goBack()}>Dismiss</Button>
        <Carousel
          data={data}
          renderItem={renderItem}
          itemWidth={windowWidth}
          sliderWidth={windowWidth}
          // slideStyle={{backgroundColor: 'gray'}}
        />
      :
        <Text style={{color: 'white', fontSize: 18}}>You haven't uploaded any photos yet!</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black'
  },
  loadingContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
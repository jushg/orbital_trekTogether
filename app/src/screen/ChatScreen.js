import React from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Screen from "../component/screen";


export default () => {
    const renderRow = ({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              width: '70%',
            //   alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
            //   backgroundColor: item.from === User.phone ? '#00A398' : '#7cb342',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
              {item.message}
            </Text>
            <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
              {this.convertTime(item.time)}
            </Text>
          </View>
        );
      };
    
    return (
        <Screen style={styles.container}>

        </Screen>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  button: {
    width:"70%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    // backgroundColor:"#028090",
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // backgroundColor: '#F0F3BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IconButton, TextInput } from "react-native-paper";

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
              alignSelf:"flex-end",
              backgroundColor:'#00A398',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
              {/* {item.message} */}
              Hello can you hear me ?
            </Text>
            <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
              {/* {this.convertTime(item.time)} */}
              01:26
            </Text>
          </View>
        );
      };
    
    return (
        <Screen style={styles.container}>
          <FlatList
           data={['1', '2', '3', '4', '5', '6', '7',"8"]}
           renderItem={renderRow}
           keyExtractor={item => item}/>
            <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <TextInput
            style={styles.input}
            placeholder="type message here..."
            
          />
         <IconButton
         size={30}
         icon="send"
         />
        </View>
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
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#cccc',
    width: '80%',
    color: '#000000',
  },
});
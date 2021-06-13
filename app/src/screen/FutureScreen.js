import React, {useState} from 'react';
import { List, Searchbar } from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Screen from "../component/screen"

export default ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState(''); //Example
    const onChangeSearch = query => setSearchQuery(query); // Example
  
    const renderTrip = ({item}) => {
        return (
        <View>
            <List.Item
                title="Bedok Reservoir"
                description="6 Jun 2021, 7am - Buddy: Freddy"
                left={props => <List.Icon {...props} icon="account" />}
            />
        </View>    
        )
    }
 
  return (
    <Screen style={styles.container}>
        <View style={{alignItems:"center"}}>
            <Searchbar
            placeholder="Search Trip"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{marginBottom:10, width:"95%"}}
            />
        </View>
        <Text style={{fontSize: 20}}>Upcoming trips</Text>
        <View >
            <FlatList
            data={['1', '2', '3', '4', '5', '6', '7',"8"]}
            renderItem={renderTrip}
            keyExtractor={item => item}/>
        </View>
    </Screen>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
    color:"#05668D"
  },
  button: {
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
   
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
  },
});
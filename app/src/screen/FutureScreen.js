import React, {useState} from 'react';
import { List, Searchbar, Button, FAB, TextInput} from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {CommonActions} from "@react-navigation/native";


import Screen from "../component/screen"
import AddScreen from "../component/modal"
// import * as Auth from "../../api/auth"
import { addTrip } from '../../utils/trip';


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

  // Example for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [partner,setPartner] = useState("");
  const [place,setPlace] = useState("");
  const [date,setDate] = useState("")
  const [notes,setNotes] = useState("this is for testing")
  
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const handleAddTrip = () => {
    addTrip(
      {partner,notes,place,date},
      () => {console.log("Add trip successfully")},
      (err) =>{console.error(err)} 
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
      <Text style={{fontSize: 20, color:"#05668D", paddingTop: 10,}}>Upcoming trips</Text>
      
      <AddScreen visible={modalVisible}  dismissable={false} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text>Add a new trip here</Text>
          <TextInput
            label="Partner (optional)"
            placeholder="John Doe"
            value={partner}
            autoCapitalize="words"
            onChangeText={setPartner}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom:10, width:"95%"}}
          />
          <TextInput
            label="Place"
            placeholder="Somewhere nice ..."
            value={place}
            autoCapitalize="words"
            onChangeText={setPlace}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom:10, width:"95%"}}
          />
          <TextInput
            label="Date"
            placeholder="Some sunny day"
            value={date}
            autoCapitalize="words"
            onChangeText={setDate}
            left={<TextInput.Icon name="human-male"/>}
            style={{marginBottom:10, width:"95%"}}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
            <Button 
            style={styles.button}
            onPress={handleAddTrip}
            >Add
            </Button>
            <Button style={styles.button} 
            onPress= {hideModal}
            >Cancel
            </Button>
          </View>
        </View>
      </AddScreen>  
    
      
      <View style={{flex:1}}>
          <FlatList
          data={['1', '2', '3', '4', '5', '6', '7',"8"]}
          renderItem={renderTrip}
          keyExtractor={item => item}/>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={showModal}
          /> 
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
  fab: {
    position: 'absolute',
    // backgroundColor:"lightblue",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    paddingHorizontal: 10
  },
  modal:{
  position:"relative",
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
}
});
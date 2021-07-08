import React, {useContext, useEffect, useState} from 'react';
import {Divider, ActivityIndicator, Caption, Card, Title,Button,Paragraph, Avatar} from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';


import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";

export default ({navigation}) => {

  // const [searchQuery, setSearchQuery] = useState(''); // Example
  // const onChangeSearch = query => setSearchQuery(query); // Example

  // const [visible, setVisible] = useState(false);
  // const openMenu = () => setVisible(true);
  // const closeMenu = () => setVisible(false);
  // const sortNewest = () => {console.log("sortNewest")};
  // const sortOldest = () => {};

  const {user} = useContext(UserContext);
  const [futureTrips, setFutureTrips] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.toDateString());
    const unsubscribeTripListener = firebase.firestore()
      .collection("trips")
      .where("members", "array-contains", user.uid)
      .where("date", ">=", today)
      .orderBy("date", "asc")
      .onSnapshot(querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setFutureTrips(results);
      });

    return () => unsubscribeTripListener();
  }, []);

  const buddyContent =({buddy}) => {
    return (
      <Avatar.Image size={40} source={require('../../assets/ava6.jpg')}/>
    )
  }
  const renderCard = ({item,user}) => {
    const date = item.date.toDate().toLocaleDateString();
    return(
      <Card>
        <Card.Title title={item.place} subtitle={date} right={buddyContent} />
        
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Paragraph>{item.notes}</Paragraph>
        </Card.Content>
       
      </Card>
    )
  }
  return (
    <>
    {futureTrips == null ? 
      <View style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </View> :
      futureTrips.length === 0?
      <View style={styles.loadingContainer}> 
        <Caption>You have no plans</Caption>
      </View> :
      <View style={styles.container}>
      <FlatList
        data={futureTrips}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ () => <Divider/> }
        // renderItem={renderFutureTrip}
        // renderItem={({item}) => Trip.renderTrip({item, user})}
        renderItem={({item}) => renderCard({item, user})}
      /> 
    </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
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
    paddingHorizontal: 10
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    width:"80%"
  }
});

 {/* <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
      <Searchbar
          placeholder="Search Trip"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
      />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton onPress={openMenu} icon="sort-variant"/>}
          style={{paddingTop: 30}}>
          <Menu.Item onPress={sortNewest} title="Newest" />
          <Menu.Item onPress={sortOldest} title="Oldest" />
        </Menu>
      </View>  */}
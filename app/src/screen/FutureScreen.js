import React, {useContext, useEffect, useState} from 'react';
import {Divider, ActivityIndicator, Caption, Card, Title,Button,Paragraph, Avatar} from "react-native-paper";
import { StyleSheet, Text, View, FlatList } from 'react-native';


import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";
import colorConst from '../constant/color';

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
  
  const renderFootnote = () => {
    return (
     <Caption style={{alignSelf:"center", paddingVertical: 25}}>
       Press and hold to view the trip details
     </Caption>
    )
  }
  const renderCard = ({item,user}) => {
    const date = item.date.toDate().toLocaleDateString();
    const hasBuddy = item.members.length === 2;
    let buddyDesc = '';
    if (hasBuddy) {
      buddyDesc += `${item.otherMemberName[user.uid]}`;
    }
    return(
      <Card 
      mode="outlined"
      style={{marginVertical:"1.5%", backgroundColor:"white", borderWidth:0.5, borderRadius:10, elevation:5}}
      onLongPress={() => console.log("Edit trip")} >
        <Card.Cover source={{ uri: 'https://picsum.photos/600' }} />
        <Card.Title 
          title={item.routeName?item.routeName+ " - " + date:"Some nice place <3" } 
          subtitle={"Place 1 - Place 2 - Place 3"} 
          right={(props) => {
            if (hasBuddy)
              return (
                <View style={{justifyContent:'center'}}>
                  <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}}/>
                </View>
              );
          }} />
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
        // ItemSeparatorComponent={ renderDivider}
        // renderItem={renderFutureTrip}
        // renderItem={({item}) => Trip.renderTrip({item, user})}
        renderItem={({item}) => renderCard({item, user})}
        ListFooterComponent={renderFootnote}
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
    paddingHorizontal: "1.5%"
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

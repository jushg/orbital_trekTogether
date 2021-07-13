import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet,  View, FlatList } from 'react-native';
import {Caption, ActivityIndicator, Card, Paragraph, Avatar} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Trip from "../../utils/trip";

export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [pastTrips, setPastTrips] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.toDateString());
    const unsubscribeTripListener = firebase.firestore()
      .collection("trips")
      .where("members", "array-contains", user.uid)
      .where("date", "<", today)
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setPastTrips(results);
      });

    return () => unsubscribeTripListener();
  }, []);

  return (
    <>
    {pastTrips == null ? 
      <View style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </View> :
      pastTrips.length === 0?
      <View style={styles.loadingContainer}> 
        <Caption>You have no recorded journals</Caption>
      </View> :
      <View style={styles.container}>
        <FlatList
          style={{paddingHorizontal:"2%"}}
          data={pastTrips}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderTrip({item, user, navigation})}
        />
      </View>
      }
    </>
    
  )
}

const renderTrip = ({item, user, navigation}) => {
  const date = item.date.toDate().toLocaleDateString();
  const hasBuddy = item.members.length === 2;
  let buddyDesc = '';
  if (hasBuddy) {
    buddyDesc += `${item.otherMemberName[user.uid]}`;
  }
  return (
    <Card 
      mode="outlined"
      style={{marginVertical:"1.5%", backgroundColor:"white", borderWidth:0.5, borderRadius:10, elevation:5}}
      onPress={ navigation ? () => navigation.dispatch(CommonActions.navigate({
        name: 'View Journal',
        params: {trip: item, otherName: buddyDesc,} //otherID: otherID},
      })
      ) : null} 
      >
        <Card.Title 
          title={item.routeName?item.routeName+ " - " + date:"Somewhere nice" } 
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

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 30,
    paddingTop: 10,
    color:"#05668D"
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
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

  // const [searchQuery, setSearchQuery] = useState(''); //Example
  // const onChangeSearch = query => setSearchQuery(query); // Example

  // const [visible, setVisible] = useState(false);
  // const openMenu = () => setVisible(true);
  // const closeMenu = () => setVisible(false);
  // const sortNewest = () => {console.log("sortNewest")};
  // const sortOldest = () => {};
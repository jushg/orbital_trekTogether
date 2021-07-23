import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Caption, Card, Text, Paragraph, Avatar} from "react-native-paper";
import {StyleSheet, View, FlatList} from 'react-native';

import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import * as Notifications from "../../utils/notifications";


export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [futureTrips, setFutureTrips] = useState(null);

  useEffect(() => {
    const setUpPushNotifications = async () => {
      await Notifications.registerForPushNotificationsAsync(user);
      Notifications.setForegroundNotificationHandler();
    };
    setUpPushNotifications();
  }, []);

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
  
  
  return (
    <>
    {futureTrips == null
      ?
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black"/>
      </View>
      : futureTrips.length === 0
        ?
        <View style={styles.loadingContainer}>
          <Caption>You have no plans</Caption>
        </View>
        :
        <View style={styles.container}>
          <FlatList
            data={futureTrips}
            keyExtractor={item => item.id}
            // renderItem={({item}) => Trip.renderTrip({item, user})}
            renderItem={({item}) => renderCard({item, user, navigation})}
            ListFooterComponent={renderFootnote}
          />
        </View>
    }
    </>
  )
}

const renderFootnote = () => {
  return (
   <Caption style={{ alignSelf: "center", paddingVertical: 25 }}>
     Press to view and edit trip details
   </Caption>
  )
}

const renderCard = ({item,user, navigation}) => {
  const date = item.date.toDate().toLocaleDateString();
  const hasBuddy = item.members.length === 2;
  let buddyDesc;
  if (hasBuddy) {
    buddyDesc = `Going with ${item.otherMemberName[user.uid]}`;
  } else if (item.inviting === {}) {
    buddyDesc = "Solo trip";
  } else {
    buddyDesc = `Pending reply from ${item.inviting.name}`;
  }
  let placeDesc = item.place;
  if (Array.isArray(item.place)) {
    placeDesc = item.place.join(", ");
  }

  return (
    <Card 
      mode="outlined"
      style={styles.card}
      onPress={() => navigation.navigate("Edit Trip", {trip: item})}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/600' }} />
      <Card.Title 
        title={item.routeName ? (item.routeName + " - " + date) : (item.place + " - " + date)}
        subtitle={placeDesc}
        subtitleNumberOfLines={3}
        right={(props) => {
          if (hasBuddy)
            return (
              <View style={{ justifyContent: 'center', padding: '0.5%' }}>
                <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}} />
              </View>
            );
        }}
      />
      <Card.Content>
        <Text style={{fontStyle: "italic"}}>{buddyDesc}</Text>
        {item.notes !== "" && <Paragraph>{item.notes}</Paragraph>}
      </Card.Content>
    </Card>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
   
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingHorizontal: "1.5%"
  },
  loadingContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    marginVertical: "1.5%",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    elevation: 5
  }
});

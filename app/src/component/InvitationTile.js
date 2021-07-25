import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, Avatar, Card, Paragraph} from "react-native-paper";

import colorConst from "../constant/color"
const InvitationTile = (props) => {
  const {trip, onAccept, onDecline, index} = props;
  // console.log("tile " + index);

  const [accepted, setAccepted] = useState(null);
  const [declined, setDeclined] = useState(null);

  // return (
  //   <View style={styles.invitation}>
  //     <Text>From: {trip.otherMemberName[trip.inviterID]}</Text>
  //     <Text>Date: {trip.date.toDate().toLocaleDateString()}</Text>
  //     <Text>Place: {Array.isArray(trip.place) ? trip.place.join(", ") : trip.place}</Text>

  //     {accepted && <Text style={{color: 'green', fontWeight: 'bold'}}>Accepted</Text>}
  //     {declined && <Text style={{color: 'red', fontWeight: 'bold'}}>Declined</Text>}
  //     {!accepted && !declined &&
  //     <>
  //       <Button icon={'check'} onPress={() => {
  //         setAccepted(true);
  //         setDeclined(false);
  //         onAccept(trip);
  //       }}>Accept</Button>
  //       <Button icon={'delete'} onPress={() => {
  //         setAccepted(false);
  //         setDeclined(true);
  //         onDecline(trip);
  //       }}>Decline</Button>
  //     </>
  //     }
  //   </View>
  // )
  return(
    <Card style={styles.invitation}>
      <Card.Title
      title={`From: ${trip.otherMemberName[trip.inviterID]}`}
      subtitle={`Date: ${trip.date.toDate().toLocaleDateString()}`}
      right={(props) => {
          return (
            <View style={{ justifyContent: 'center', padding: '1.5%' }}>
              <Avatar.Image {...props} size={60} source={{uri: trip.otherAvatarURL[trip.inviterID]}} />
            </View>
          );
      }}
      />
      <Card.Content>
        <Paragraph>Place: {Array.isArray(trip.place) ? trip.place.join(", ") : trip.place}</Paragraph>
        {accepted && <Text style={{color: 'green', fontWeight: 'bold'}}>Accepted</Text>}
        {declined && <Text style={{color: 'red', fontWeight: 'bold'}}>Declined</Text>}
      </Card.Content>
      {!accepted && !declined &&
      <Card.Actions style={{justifyContent:"flex-end"}}>
        <Button onPress={() => {
          setAccepted(true);
          setDeclined(false);
          onAccept(trip);
        }}>Accept</Button>
        <Button onPress={() => {
          setAccepted(false);
          setDeclined(true);
          onDecline(trip);
        }}>Decline</Button>
      </Card.Actions>
    }
    </Card>
  )
};

const styles = StyleSheet.create({
  invitation: {
    backgroundColor: colorConst.secondaryLight,
    borderWidth: 0.75,
    borderRadius: 10,
    borderColor: "black",
    elevation: 10,
    marginVertical: 10
  }
});

export default InvitationTile;
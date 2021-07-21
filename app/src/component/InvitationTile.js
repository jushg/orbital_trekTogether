import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-paper";

const InvitationTile = (props) => {
  const {trip, onAccept, onDecline, index} = props;
  // console.log("tile " + index);

  const [accepted, setAccepted] = useState(null);
  const [declined, setDeclined] = useState(null);

  return (
    <View style={styles.invitation}>
      <Text>From: {trip.otherMemberName[trip.inviterID]}</Text>
      <Text>Date: {trip.date.toDate().toLocaleDateString()}</Text>
      <Text>Place: {Array.isArray(trip.place) ? trip.place.join(", ") : trip.place}</Text>

      {accepted && <Text style={{color: 'green', fontWeight: 'bold'}}>Accepted</Text>}
      {declined && <Text style={{color: 'red', fontWeight: 'bold'}}>Declined</Text>}
      {!accepted && !declined &&
      <>
        <Button icon={'check'} onPress={() => {
          setAccepted(true);
          setDeclined(false);
          onAccept(trip);
        }}>Accept</Button>
        <Button icon={'delete'} onPress={() => {
          setAccepted(false);
          setDeclined(true);
          onDecline(trip);
        }}>Decline</Button>
      </>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  invitation: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black"
  }
});

export default InvitationTile;
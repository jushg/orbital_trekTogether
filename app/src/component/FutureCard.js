import React,{useState,useEffect} from "react"
import { View, StyleSheet, Text } from "react-native";
import { Card, Avatar,Paragraph, Title } from "react-native-paper"
import { MAPS_API_KEY } from "@env";

import loadingImg from "../../assets/loading.jpg"
export default (props) => {
  const {item,user,navigation} = props
  const date = item.date.toDate().toLocaleDateString();
  const hasBuddy = item.members.length === 2;
  let buddyDesc;
  if (hasBuddy) {
    buddyDesc = `Going with ${item.otherMemberName[user.uid]}`;
  } else if (!item.inviting.name) {
    buddyDesc = "Solo trip";
  } else {
    buddyDesc = `Pending reply from ${item.inviting.name}`;
  }
  
  let placeDesc = item.place;
  if (Array.isArray(item.place)) {
    placeDesc = item.place.join(", ");
  }

  // photoRef is the result of the initial Place Search query
  const photoRef = item.coverPhotoRef[0]
  let imageLookupURL
  // let imageURLQuery 
  if (photoRef) {
    imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${MAPS_API_KEY}&maxwidth=700&maxheight=700`;
  }
  const [imageURL,setImageURL] = useState("none")

  useEffect(() => {
    fetch(imageLookupURL)
    .then(response => response.url)
    .then(data => {
      setImageURL(data)
      console.log(imageURL)
    })
    .catch(err => console.error(err))
    // .then(data => image = data);
  }, []);
  return(
      <Card 
      mode="outlined"
      style={styles.card}
      onPress={() => navigation.navigate("Edit Trip", {trip: item})} >
      {imageURL == "none" ? <Card.Cover source={loadingImg} />: <Card.Cover source={{uri: imageURL}} />}
      <Card.Title 
      title={item.routeName ? (item.routeName + " - " + date) : (item.place + " - " + date)}
      subtitle={date + " - " + buddyDesc}
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
      <Paragraph style={{fontStyle: "italic"}}>{`Destination: ${placeDesc}`}</Paragraph>
      {item.notes !== "" && 
        <Paragraph>{`Notes: ${item.notes}`}</Paragraph>
      }
    </Card.Content>
      
      </Card>
  )
}



const styles = StyleSheet.create({
    card: {
      marginVertical: "1.5%",
      backgroundColor: "white",
      borderWidth: 0.5,
      borderRadius: 10,
      elevation: 5
    }
  });
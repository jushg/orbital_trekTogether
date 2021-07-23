import React,{useState,useEffect} from "react"
import { View } from "react-native";
import { Card, Avatar,Paragraph } from "react-native-paper"
import { MAPS_API_KEY } from "@env";

export default (props) => {
    const {item,user,navigation} = props
    const [coverPhoto,setCoverPhoto] = useState(null)
    const date = item.date.toDate().toLocaleDateString();
    const hasBuddy = item.members.length === 2;
    let buddyDesc = '';
    if (hasBuddy) {
        buddyDesc += `${item.otherMemberName[user.uid]}`;
    }
    let placeDesc = ""
    if(Array.isArray(item.place)){
        item.place.forEach(place => {
        placeDesc += place + " - "
        });
    }
    placeDesc = placeDesc.slice(0,-3)

    const photoRef = "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU"
    // const coverPhotoLink = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${MAPS_API_KEY}`
    const coverPhotoLink = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photoRef+ "&key="+MAPS_API_KEY
    useEffect(() => {
      fetch("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyBE3tFrOgHSaxMno1A77q_4lC6_G4zE_Zg")
      .then(response => {console.log(response)
        response.json()})
      .then(data => console.log(data));
    }, []);

    return(
        <Card 
        mode="outlined"
        style={{marginVertical:"1.5%", backgroundColor:"white", borderWidth:0.5, borderRadius:10, elevation:5}}
        onPress={() => navigation.navigate("Edit Trip")} >
        {coverPhoto != null && <Card.Cover source={{coverPhoto}} />}
        <Card.Title 
            title={item.routeName?item.routeName+ " - " + date:"This is the past now :(" } 
            subtitle={placeDesc?placeDesc:"My legacy will live on"} 
            subtitleNumberOfLines={3}
            right={(props) => {
            if (hasBuddy)
                return (
                <View style={{justifyContent:'center', padding:'0.5%'}}>
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
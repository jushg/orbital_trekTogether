import React from "react";
import { Portal,Modal} from "react-native-paper";
import { StyleSheet, View } from "react-native";


export default (props) => {
    return(
        <Portal>
             <Modal 
            visible={props.visible}
            dismissable={props.dismissable}
            onDismiss={props.onDismiss}
            contentContainerStyle={{backgroundColor: 'white'}}
             >
                {props.children}
            </Modal>
         </Portal>
           
    );
}
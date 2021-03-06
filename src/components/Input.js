import React from 'react';
import { TextInput, View, Text, Platform,Dimensions } from 'react-native';
import { Input } from 'react-native-elements';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const NewInput = (props) => {

   // if (Platform.OS === 'ios') {
   //    return (
   //       <Input
   //          {...props}
   //          autoCorrect={false}
   //          style={styles.input}
   //       />
   //    );
   // }

   return (
     <View style={styles.containerStyle}>
       <TextInput
         {...props}
         autoCorrect={false}
         style={[styles.input,{borderBottomWidth:1,borderBottomEndRadius:0,borderBottomLeftRadius:0}]}
         autoCorrect={false}
       />
     </View>
   );
};

const styles = {
   containerStyle: {
      borderBottomWidth: 0,
      padding: 0,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
   },
   input:{
      borderWidth:2,
      borderColor:"#5F5F5F",
      backgroundColor:"#FEF9EF",
      width:screenWidth*0.7,
      height:screenHeight*0.08,
      borderRadius:10,
      fontSize:20,
      paddingLeft:5
    },
};

export default NewInput;

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking,Switch} from "react-native";



const AccountScreen = ({activity,navigation}) => {
    
    

    return(
        <View style={styles.act_pat}>
            <Text>hi</Text>
           
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    act_pat:{
        flexDirection:"row",
        backgroundColor:"#FEF0AB",
        height:200,
        marginBottom:10,
        marginLeft:15,
        marginRight:15,
        alignItems:"center",
        borderRadius:15
    },
    act_pat_left:{
        width:"38%"
    },
    act_pat_right:{
        width:"60%"
    },
    act_pat_text:{
        marginLeft:15,
        fontSize:18,
        marginBottom:5,
    },
    act_img:{
        width:120,
        height:150,
        marginLeft:20,
        borderRadius:5
    },
    act_btn:{
        height:35,
        backgroundColor:"#FFA000",
        marginLeft:50,
        marginRight:50,
        justifyContent:"center",
        borderRadius:35/2
    }

    });

export default AccountScreen;
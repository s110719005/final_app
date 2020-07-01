import React,{useState,useEffect,useContext,createContext} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image,AsyncStorage,Button} from "react-native";

import FloatingButton from '../component/floatingButton'




import { StoreContext } from "../src/stores";
import * as firebase from "firebase";




let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
    authDomain: "appfinal-23a98.firebaseapp.com",
    databaseURL: "https://appfinal-23a98.firebaseio.com",
    projectId: "appfinal-23a98",
    storageBucket: "appfinal-23a98.appspot.com",
    messagingSenderId: "235000499477",
    appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ChangeDataScreen = ({navigation}) => {
  

    

    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"red"}}>
                            <View style={styles.container}>
                                <SafeAreaView style={{ backgroundColor: '#FEF9EF' }}/>
                                <View style={{width:40,height:40,marginTop:screenWidth*0.1,marginLeft:screenWidth*0.05}}>
                                    <TouchableOpacity
                                    onPress={()=> navigation.goBack("User")}
                                    >
                                    <Image source={require('../assets/btn/btn_goback.png')} 
                                        style={styles.goback_btn}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.change_con}>
                                    <TouchableOpacity>
                                    <Text style={styles.change_con_text}>更改頭貼</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                    <Text style={styles.change_con_text}>更改暱稱</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.save_con}>
                                    <TouchableOpacity>
                                    <Text style={styles.logout}>儲存</Text>
                                    </TouchableOpacity>
                                </View>
                                        
                                       
                                
                            </View>
                    </View>
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {navigation}
                            />
                           
                       <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text style={styles.page_name_text}>修改資料</Text>
                       </View>
                       <TouchableOpacity 
                        >
                            <Image source={require('../assets/btn/btn_add.png')} 
                            style={styles.tab_btn}/>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView/> 
            </View>
    );
    
}

const styles = StyleSheet.create({
    tab:{
        display:"flex",
        flexDirection:"row",
        height:screenHeight*0.12,
        alignItems:"flex-end",
        paddingBottom:screenHeight*0.04,
        

    },
    tab_btn:{
        width:30,
        height:30,
        margin:5,
        
        
    },
    page_name:{
      marginTop:screenHeight*0.01,
        alignItems:"center",
        height:40
    },
    page_name_text:{
      color:"white",
      fontSize:23,
      fontWeight:"500",
      textAlign:"center",
      lineHeight:40,
      letterSpacing:5
    },
    container: {
        flex: 1,
        backgroundColor: '#FEF9EF',
      },
    goback_btn:{
        width:40,
        height:40,
    },
    change_con:{
        alignItems:"center",
        marginTop:screenHeight*0.2
    },
    change_con_text:{
        color:"#5E5E5E",
        fontSize:23,
        fontWeight:"500",
        letterSpacing:5,
        margin:screenHeight*0.02
    },
    save_con:{
        alignItems:"center",
        marginTop:screenHeight*0.05
    },
    logout:{
        color:"#5E5E5E",
        backgroundColor:"#B8F2E6",
        width:screenWidth*0.38,
        height:screenHeight*0.05,
        textAlign:"center",
        fontSize:23,
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop:15,
        borderColor:"#707070",
        borderRadius:screenHeight*0.025,
        borderWidth:2,
        overflow: "hidden",
      },  

    });

export default ChangeDataScreen;
import React,{useState,useEffect,useContext,createContext} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image,AsyncStorage,Button} from "react-native";

import FloatingButton from '../component/floatingButton'
import AddListModal from '../component/addListModal'
import Fire from '../component/fire'
import cleanData from '../component/cleanData'


import Input from "../src/components/Input";
import Confirm from "../src/components/Confirm";
import { StoreContext } from "../src/stores";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



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

const AccountScreen = ({navigation}) => {
    const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;
  
  const onSignOut = () => {
    firebase.auth().signOut();
    setIsLogin(false);
  };

    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#FFCB77"}}>
                            <View style={styles.container}>
                                <SafeAreaView style={{ backgroundColor: '#FFCB77' }}/>
                                
                                
                                
                        </View>
                            
                        <Button
                            title="Sign out"
                            buttonStyle={{ backgroundColor: "#F8671D" }}
                            containerStyle={{ padding: 5 }}
                            onPress={onSignOut}
                        />
                        
                    </View>
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {navigation}
                            />
                           
                       <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text>會員</Text>
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
        paddingBottom:screenHeight*0.04

    },
    tab_btn:{
        width:30,
        height:30
    },
    page_name:{
        
        alignItems:"center"
    },
    container: {
        flex: 1,
        backgroundColor: '#FFCB77',
        alignItems: 'center',
        //paddingTop:screenHeight*0.2
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
      login:{
        backgroundColor:"#9FD47C",
        width:screenWidth*0.3,
        height:screenHeight*0.05,
        textAlign:"center",
        fontSize:23,
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop:50,
        borderColor:"white",
        borderRadius:screenHeight*0.025,
        borderWidth:2,
        overflow: "hidden",
      }

    });

export default AccountScreen;
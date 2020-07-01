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
let db = firebase.firestore();
const AccountScreen = ({navigation}) => {
  
  const [userName,setUserName] = useState();
  const [userPic,setUserPic] = useState();
    const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;

  

  
  const onSignOut = async() => {
    
    firebase.auth().signOut();
    setIsLogin(false);
    // await AsyncStorage.setItem("ifLogin",isLogin)
    //   let logged = await AsyncStorage.getItem("ifLogin");
    //   setIfLogin(logged);
    
    
  };

  let userRef = db.collection("users").doc(firebase.auth().currentUser.uid);

  
  let userData = userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      setUserName(doc.data().username);
      setUserPic(doc.data().pic);
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });


    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"red"}}>
                            <View style={styles.container}>
                                <SafeAreaView style={{ backgroundColor: '#9DD5DF' }}/>
                                  <View style={styles.userdata_con}>
                                    <Image source={{uri:userPic}} 
                                      style={styles.user_pic}/>    
                                    <Text style={styles.username_text}> {userName} </Text>   
                                  </View>   
                                
                            </View>
                            <View style={{width:screenWidth,height:screenHeight*0.6,backgroundColor:"#FEF9EF"}}>
                              <View style={styles.account_setting}>
                                <View style={{justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.05,marginBottom:15}}>
                                    <TouchableOpacity onPress={() => navigation.push("Setting")}
                                    style={{justifyContent:"center",alignItems:"center",width:200}}>
                                        
                                            <Text style={styles.account_btn}>設定</Text>
                                    </TouchableOpacity>
                                  </View>

                                  <View style={{justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.05,marginBottom:15}}>
                                    <TouchableOpacity onPress={() => navigation.push("Modify")}
                                    style={{justifyContent:"center",alignItems:"center",width:200}}>
                                        
                                            <Text style={styles.account_btn}>修改資料</Text>
                                    </TouchableOpacity>
                                  </View>

                                  <View style={{justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.05,marginBottom:15}}>
                                    <TouchableOpacity onPress={() => navigation.push("Connect")}
                                    style={{justifyContent:"center",alignItems:"center",width:200}}>
                                        
                                            <Text style={styles.account_btn}>連動帳號</Text>
                                    </TouchableOpacity>
                                  </View>
                              </View>

                              <TouchableOpacity onPress={onSignOut}
                                style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.logout}>登出</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onSignOut}
                                style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.logout}>註銷</Text>
                                </TouchableOpacity>   
                            </View>
                            
                        
                        
                    </View>
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {navigation}
                            />
                           
                       <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text style={styles.page_name_text}>會員</Text>
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
    userdata_con:{
        marginTop:screenHeight*0.05
    },
    username_text:{
        alignSelf:"center",
        marginTop:15,
        color:"#5F5F5F",
        fontSize:20,
        fontWeight:"700",
        letterSpacing:5
    },
    user_pic:{
        width:screenWidth*0.2,
        height:screenWidth*0.2
    },
    container: {
        flex: 1,
        backgroundColor: '#9DD5DF',
        alignItems: 'center',
        //paddingTop:screenHeight*0.2
      },
      account_setting:{
        marginVertical:screenHeight*0.1
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
      account_btn:{
        color:"#5E5E5E",
        
        textAlign:"center",
        fontSize:23,
        paddingHorizontal:10,
        paddingVertical:10,
        
        width:screenWidth*0.3,
      }

    });

export default AccountScreen;
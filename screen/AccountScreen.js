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
    const [username,setUserName] = useState();
    const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let db = firebase.firestore();

  const onSignIn = async () => {
    setError(" ");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError("");
      setIsLogin(true);   
    } catch (err) {
      setShowModal(true);
      setLoading(false);
    }
  };

  const onCreateUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setShowModal(false);
      setError("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setIsLogin(true);
      
    } catch (err) {
      setShowModal(false);
      setError(err.message);
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const onCLoseModal = () => {
    setShowModal(false);
    setError("");
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const renderButton = () => {
    return loading ? (
      <ActivityIndicator size="large" style={{ marginTop: 30 }} />
    ) : (
      <Button
        title="/2"
        buttonStyle={{ backgroundColor: "#4AAF4C" }}
        containerStyle={{ padding: 5 }}
        onPress={onSignIn}
      />
    );
  };

    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#FFCB77"}}>
                            <View style={styles.container}>
                                <SafeAreaView style={{ backgroundColor: '#FFCB77' }}/>
                                
                                <Text style={{fontSize:20,marginBottom:10}}>Hello {username} </Text>
                                <Input placeholder="請輸入使用者名稱"
                                    labelStyle={{ marginTop: 20 }}
                                    label="Email"
                                    placeholder="ntue@dtd.com"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={(email) => setEmail(email)}
                                    
                                    style={[styles.input,{borderBottomWidth:1,borderBottomEndRadius:0,borderBottomLeftRadius:0}]} />
                                <Input placeholder="請輸入密碼"
                                    labelStyle={{ marginTop: 20 }}
                                    label="Password"
                                    placeholder="Must have at least 7 characters"
                                    secureTextEntry
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                    style={[styles.input,{borderTopWidth:1,borderTopRightRadius:0,borderTopStartRadius:0}]} />
                                
                                <TouchableOpacity onPress={onSignIn}
                                style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.login}>登入</Text>
                                </TouchableOpacity> 
                            </View>
                            <Confirm
                                title="Are you sure to create a new user?"
                                visible={showModal}
                                onAccept={onCreateUser}
                                onDecline={onCLoseModal}
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
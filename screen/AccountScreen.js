import React,{useState,useEffect,useContext,createContext} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image,AsyncStorage,Button,Alert} from "react-native";

import FloatingButton from '../component/floatingButton'
import AddListModal from '../component/addListModal'
import Fire from '../component/fire'
import cleanData from '../component/cleanData'


import Input from "../src/components/Input";
import Input2 from "../src/components/Input2";
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

    

  


  const componentDidMount = () =>{
    firebase = new Fire((error,user) => {
        if(error){
            return alert("哇 好像哪裡出錯了...");
        }

        firebase.getLists(lists => {
            this.setState({ lists, user }, () => {
                this.setState({ loading: false });
            });
        });
        
        this.setState({user});
    });
};



const componentWillUnmount = () =>{
    firebase.detach();
};

let db = firebase.firestore();
// var ref = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("1");
// var ref2 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("2");
// var ref3 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("3");
// var ref4 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("4");

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
      //setShowModal(true);
      Alert.alert(
        '無此帳號或密碼錯誤',
        '是否直接建立帳號？',
        [
          {
            text: '好',
            onPress:onCreateUser
          },
          {
            text: '下次再說',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
      setLoading(false);
    }
  };
  
  

  const onCreateUser = async (user) => {
    try {
        
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then (userCredential => {
        var ref = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("1");
        var ref2 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("2");
        var ref3 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("3");
        var ref4 = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc("4");
        var ref5 = db.collection("users").doc(firebase.auth().currentUser.uid);
        //set data into User database
        ref5.set({
          username:"使用者",
          pic:"https://i.ibb.co/CKctjN7/img-logo.png"
        })
        ref.set({
            no:"1",
            id:1,
            genre:"衛浴",
            pic:"https://github.com/s110719005/app_final_pic/blob/master/pic_bathroom2.png?raw=true",
            todos:[
                {
                key:"1",
                title:"預設",
                note:"備註",
                day:0,
                limit:30,
                safe:true,
                normal:false,
                danger:false
                }
            ]
                
        })

        ref2.set({
          no:"2",
            id:2,
            genre:"廚房",
            pic:"https://github.com/s110719005/app_final_pic/blob/master/pic_kitchen.png?raw=true",
            todos:[
                {
                key:"2",
                title:"預設",
                note:"備註",
                day:0,
                limit:30,
                safe:true,
                normal:false,
                danger:false
                }
            ]
          
        })
        ref3.set({
          no:"3",
            id:3,
            genre:"起居",
            pic:"https://github.com/s110719005/app_final_pic/blob/master/pic_bedroom.png?raw=true",
            todos:[
                {
                key:"3",
                title:"預設",
                note:"備註",
                day:0,
                limit:30,
                safe:false,
                normal:true,
                danger:false
                }
            ]
          
        })
        ref4.set({
          no:"4",
            id:4,
            genre:"其他",
            pic:"https://github.com/s110719005/app_final_pic/blob/master/pic_household.png?raw=true",
            todos:[
                {
                key:"4",
                title:"預設",
                note:"備註",
                day:0,
                limit:30,
                safe:false,
                normal:false,
                danger:true
                }
            ]
          
        })
      });
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
                                
                                {/* <Text style={{fontSize:20,marginBottom:10}}>Hello {username} </Text> */}
                                <Input placeholder="請輸入使用者名稱"
                                    labelStyle={{ marginTop: 20 }}
                                    label="Email"
                                    placeholder="電子信箱"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={(email) => setEmail(email)}
                                    
                                    style={[styles.input,{borderBottomWidth:1,borderBottomEndRadius:0,borderBottomLeftRadius:0}]} />
                                <Input2 placeholder="請輸入密碼"
                                    labelStyle={{ marginTop: 20 }}
                                    label="Password"
                                    placeholder="密碼"
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
                             {/* <Text>還不是會員？<Text>註冊一下</Text></Text>  */}
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
        paddingBottom:screenHeight*0.04

    },
    tab_btn:{
        width:30,
        height:30
    },
    page_name:{
        
        alignItems:"center"
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
        backgroundColor: '#FFCB77',
        alignItems: 'center',
        
        paddingTop:screenHeight*0.25
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
        color:"#5F5F5F",
        backgroundColor:"#9FD47C",
        width:screenWidth*0.38 ,
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
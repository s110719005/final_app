import React ,{useState,useEffect,useContext,createContext} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView ,Dimensions, TouchableOpacity,AsyncStorage} from 'react-native';
import HomeStackScreen from './screen/Stack/HomeStackScreen'
import HistoryStackScreen from './screen/Stack/HistoryStackScreen'
import HistoryScreen from './screen/HistoryScreen'
import HomeScreen from './screen/HomeScreen'
import AccountScreen from './screen/AccountScreen'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import StackScreen from './screen/StackScreen'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default function App(navigation) {
  const [username,setUserName] = useState();
  
  const save = async() => {
    try{
      await AsyncStorage.setItem("MyName",username)
    }catch (err) {
      alert(err)
    }
  }

  const load= async() =>{
    try{
      let username = await AsyncStorage.getItem("MyName")

      if(username !== null){
        setUserName(username);
      }
    }catch(err){
      alert(err)
    }
  }

  useEffect(()=> {
    load()
  },[])

  const Stack = createStackNavigator()

  return (
    //<HomeScreen></HomeScreen>
    <StackScreen></StackScreen>
    // <NavigationContainer>
    //     <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //       animationEnabled:true


    //     }}
         
    //     >
    //         <Stack.Screen name="Home" component={HomeScreen}
    //         navigation={navigation}
    //         />
    //         <Stack.Screen name="History" component={HistoryStackScreen}/>
    //         <Stack.Screen name="Account" component={AccountScreen}/>
    //     </Stack.Navigator>
    // </NavigationContainer>


    // <View style={styles.container}>
      
    //   <HomeScreen></HomeScreen>
    //   {/* <SafeAreaView/> */}
    //   {/* <Text style={{fontSize:20,marginBottom:10}}>Hello {username} </Text>
    //   <TextInput placeholder="請輸入使用者名稱"
    //     onChangeText = {text => setUserName(text)}
        
    //     style={[styles.input,{borderBottomWidth:1,borderBottomEndRadius:0,borderBottomLeftRadius:0}]} />
    //   <TextInput placeholder="請輸入密碼"
        
    //     style={[styles.input,{borderTopWidth:1,borderTopRightRadius:0,borderTopStartRadius:0}]} />
    //   <TouchableOpacity onPress = {() => save()}
    //   style={{justifyContent:"center",alignItems:"center"}}>
    //     <Text style={styles.login}>登入</Text>
    //   </TouchableOpacity> */}
    // </View>
  );
}

const styles = StyleSheet.create({
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

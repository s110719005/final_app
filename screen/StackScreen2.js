import React, { Component, Fragment,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";




import AccountScreen2 from './AccountScreen2'
import SettingScreen from './SettingScreen'
import StackScreen from './StackScreen'


import { StoreContext, StoreProvider } from "../src/stores";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 


const StackScreen2 = ({navigation}) => {
    
    

    const { isLoginState } = useContext(StoreContext);
    const [ isLogin, setIsLogin] = isLoginState;


    const Stack = createStackNavigator()

  
    return  (
        <Text>hi</Text>
        // <NavigationContainer
        // independent ={true}
        // >
        //   <Stack.Navigator
        //   independent ={true}
        //   screenOptions={{
        //     headerShown: false,
        //     //animationEnabled:false
            
  
        //   }}
        //   >
        //     {/* <Stack.Screen name="User" component={AccountScreen2}/>
        //     <Stack.Screen name="Setting" component={SettingScreen}/> */}
        //     {/* <Stack.Screen name="Home" component={StackScreen}/> */}
            
        //   </Stack.Navigator>
        // </NavigationContainer>
      );
  }



  export default () => {
    return (
      <StoreProvider>
        <StackScreen2 />
      </StoreProvider>
    );
  };

const styles = StyleSheet.create({
    
});


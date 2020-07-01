import React, { Component, Fragment,useContext,useEffect,useState } from "react";
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
import { AsyncStorage } from 'react-native';


import HistoryScreen from './HistoryScreen'
import HomeScreen from './HomeScreen'
import HomeScreenDefault from './HomeScreenDefault'
import AccountScreen from './AccountScreen'
import AccountScreen2 from './AccountScreen2'
import ChangeDataScreen from './ChangeDataScreen'
import ConnectScreen from './ConnectScreen'
import CreateConnectScreen from './CreateConnectScreen'
import ManageConnectScreen from './ManageConnectScreen'
import SettingScreen from './SettingScreen'

import { StoreContext, StoreProvider } from "../src/stores";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 
function Account() {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
    independent ={true}
    screenOptions={{
      headerShown: false,
      //animationEnabled:false
      

    }}
    >
      <Stack.Screen name="User" component={AccountScreen2}/>
      <Stack.Screen name="Setting" component={SettingScreen}/>
      <Stack.Screen name="Modify" component={ChangeDataScreen}/>
      <Stack.Screen name="Connect" component={ConnectScreen}/>
      <Stack.Screen name="CreateConnect" component={CreateConnectScreen}/>
      <Stack.Screen name="ManageConnect" component={ManageConnectScreen}/>
      
    </Stack.Navigator>
  );
}



const StackScreen = ({navigation}) => {
    
    

    const { isLoginState } = useContext(StoreContext);
    const [ isLogin, setIsLogin] = isLoginState;

    
    const Stack = createStackNavigator()
    

  
    return isLogin ? (
        <NavigationContainer
        independent ={true}
        >
        <Stack.Navigator
        independent ={true}
        screenOptions={{
          headerShown: false,
          animationEnabled:false


        }}
         
        >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="History" component={HistoryScreen}/>
            <Stack.Screen
            independent ={true}
          name="Account"
          component={Account}
          options={{
            headerTitleStyle: {
              fontWeight: "400",
              fontSize: 20,
            },
          }}
        />
        </Stack.Navigator>
    </NavigationContainer>
        

    ): (
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled:false
  
  
          }}
          >
            <Stack.Screen name="Home" component={HomeScreenDefault}/>
            <Stack.Screen name="History" component={HistoryScreen}/>
            <Stack.Screen
              name="Account"
              component={AccountScreen}
              options={{
                headerTitleStyle: {
                  fontWeight: "400",
                  fontSize: 20,
                },
              }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      );
  }



  export default () => {
    return (
      <StoreProvider>
        <StackScreen />
      </StoreProvider>
    );
  };

const styles = StyleSheet.create({
    
});


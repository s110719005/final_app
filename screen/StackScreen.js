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



import HistoryScreen from './HistoryScreen'
import HomeScreen from './HomeScreen'
import AccountScreen from './AccountScreen'
import AccountScreen2 from './AccountScreen2'
import AccountStackScreen from './Stack/AccountStackScreen'
import UserScreen from '../src/screens/UserScreen'

import { StoreContext, StoreProvider } from "../src/stores";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 


const StackScreen = ({navigation}) => {
    const { isLoginState } = useContext(StoreContext);
    const [ isLogin, setIsLogin] = isLoginState;
    const Stack = createStackNavigator()

  
    return isLogin ? (
        <NavigationContainer
        independent ={true}
        >
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled:false


        }}
         
        >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="History" component={HistoryScreen}/>
            <Stack.Screen
          name="Account"
          component={AccountScreen2}
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
            <Stack.Screen name="Home" component={HomeScreen}/>
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


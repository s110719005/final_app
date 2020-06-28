import React, { Component, Fragment } from "react";
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

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 


const StackScreen = ({navigation}) => {
  
    const Stack = createStackNavigator()

  
    return (
        <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled:true


        }}
         
        >
            <Stack.Screen name="Home" component={HomeScreen}
            navigation={navigation}
            />
            <Stack.Screen name="History" component={HistoryScreen}/>
            <Stack.Screen name="Account" component={AccountScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
        

    );
  }



export default StackScreen;

const styles = StyleSheet.create({
    
});
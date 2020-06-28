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

import HomeScreen from '../HomeScreen'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 


const HomeStackScreenScreen = ({navigation}) => {
  
 

  
    return (
        <Fragment>
            <HomeScreen
            navigation={navigation}
            ></HomeScreen>
            
            
        </Fragment>
        

    );
  }



export default HomeStackScreenScreen;

const styles = StyleSheet.create({
    
});
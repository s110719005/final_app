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

import HistoryScreen from '../HistoryScreen'

//library imports
//import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 


const HistoryStackScreen = ({navigation}) => {
  
 

  
    return (
        <Fragment>
            <HistoryScreen
            navigation={navigation}
            ></HistoryScreen>
            
            
        </Fragment>
        

    );
  }



export default HistoryStackScreen;

const styles = StyleSheet.create({
    
});
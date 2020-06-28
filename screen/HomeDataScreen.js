import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions,SafeAreaView,FlatList,ScrollView} from "react-native";

import FlatlistDetail from '../component/flatlistDetail'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;



export default class HomeDataScreen extends Component {
    
    
    render(){
        const list = this.props.list
        const safeCount = list.todos.filter(todo => todo.safe).length;
        return(
            <View style={styles.home_container}>
                    
                    <SafeAreaView style={{ backgroundColor: '#7FB134' }}/>
                    <View style={styles.header}>
                        <View>
                        <Image
                            style={styles.header_pic}
                            source={{
                                uri: list.pic
                            }}
                        />
                        </View>
                        <View style={styles.header_title}>
                            <Image source={require('../assets/btn/btn_toleft.png')} style={styles.header_btn}/>
                            <Text style={styles.header_text}>{list.genre}</Text>
                            
                            <Image source={require('../assets/btn/btn_toright.png')} style={styles.header_btn}/>
                        </View>
                        
                    </View>
                    <Text>hi {safeCount} </Text>
                    <View style={{flex:1}}>
                        <ScrollView style={styles.list_container} 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flex:1}}>
                            <FlatlistDetail list={list} />
                        </ScrollView>
                    </View>
                    
                    
            </View>
             );
    }

    
        
        
   
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: '#FFCB77',
        width: screenWidth,
        height: screenHeight*0.86
    },
    header:{
        paddingTop:"7%",
        alignItems: 'center',
    },
    header_pic:{
        width:75,
        height:75
    },
    header_title:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        paddingTop:"3%",
    },
    header_btn:{
        width:13,
        height:15
    },
    header_text:{
        fontSize:30,
        fontWeight:"900",
        paddingLeft:"5%",
        paddingRight:"5%"
    },
    list_container:{
        paddingTop:screenHeight*0.05,
        paddingLeft:screenWidth*0.05,
        height:screenHeight*0.6,
    }

    });


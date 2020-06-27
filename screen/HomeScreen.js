import React,{Component, useEffect,useState} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView,Image, ScrollView,FlatList,Modal, TouchableOpacity} from 'react-native';



import cleanData from '../component/cleanData'
import HomeData from './HomeDataScreen'
import AddListModal from '../component/addListModal'
import FloatingButton from '../component/floatingButton'
import Fire from '../component/fire'

import Pie from 'react-native-pie'
import VitoryPie, { VictoryPie } from "victory-native"

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let count = 25;
class HomeScreen extends Component {
    

    state = {
        addTodoVisible : false,
        lists: cleanData,
        user:{}
        
    };

    componentDidMount(){
        firebase = new Fire((error,user) => {
            if(error){
                return alert("哇 好像哪裡出錯了...")
            }

            this.setState({user});
        });
    }

    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible });
    }

    renderList =list =>{
        return <HomeData list={list}/>
    }

    addList = list ={

    };

   
    
    

    render (){

        let totalSafe = 0;
        let totalNormal = 0;
        let totalDanger = 0;
        let totalQuantity = 0;
        cleanData.forEach((item) => {
            totalSafe += item.todos.filter(todo => todo.safe).length;
            totalNormal += item.todos.filter(todo => todo.normal).length;
            totalDanger += item.todos.filter(todo => todo.danger).length;
            totalQuantity += item.todos.filter(todo => todo.title).length;
            //totalQuantity += item.safe2;
            //totalPrice += item.quantity * item.price;
        })
        
        const defaultData =[
            {x:totalSafe/totalQuantity,y:100},
            {x:"normal",y:0},
            {x:"danger",y:0}

        ];
        const sampleData =[
            {x:[totalSafe],y:totalSafe/totalQuantity},
            {x:totalNormal,y:totalNormal/totalQuantity},
            {x:totalDanger,y:totalDanger/totalQuantity}

        ];
        const dataColor=[
            "#9FD47C","#FFE047","#F16464"
        ];
        
        
        
        return(
            
            <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    <Modal 
                    animationType="slide" 
                    transparent={true}
                    //visible={true}
                    visible={this.state.addTodoVisible} 
                    onRequestClose={()=>this.state.toggleAddTodoModal()}
                    >
                        <AddListModal list={cleanData} closeModal={()=> this.toggleAddTodoModal()} addList={this.addList}/>
                    </Modal>
                    <View style={{height:screenHeight*0.86}}>
                    <FlatList 
                    ListHeaderComponent={
                        <>
                            <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#FFCB77"}}>
                            <SafeAreaView style={{ backgroundColor: '#FFCB77' }}/>
                            <View style={styles.chart_container}>
                                
                                <VictoryPie 
                                    
                                    width={screenWidth*0.7}
                                    animate={{ easing: 'exp' }}
                                    data={sampleData}
                                    colorScale={dataColor}
                                    innerRadius={screenWidth*0.34}
                                    labelRadius={screenWidth*0.26}
                                    height={screenWidth*0.75}
                                    padAngle={0}
                                    style={{
                                        data: {
                                          fillOpacity: 0.9, stroke: "white", strokeWidth: 4
                                        },
                                        labels: {
                                          fontSize:20
                                        }
                                      }}
                                />
                            </View>
                                <View style={styles.home_text_bar}>
                                <Text style={styles.home_text}>安全已佔四成,{"\n"}相信還可以更多! :)</Text>
                                </View>
                                <Text>      User:{this.state.user.uid} </Text>
                            </View>
                            
                            
                        </>
                    }
                    data={this.state.lists} 
                    keyExtractor={item => item.genre} 
                    pagingEnabled={true}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => this.renderList(item) }
                    />
                    </View>
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton/>
                            {/* <Image source={require('../assets/btn/btn_menu.png')} 
                            style={[styles.tab_btn,{marginRight:screenWidth*0.7}]}/> */}
                       <View style={{width:screenWidth*0.7}}></View>
                        <TouchableOpacity onPress={()=> this.toggleAddTodoModal()}>
                            <Image source={require('../assets/btn/btn_add.png')} 
                            style={styles.tab_btn}/>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView/> 
            </View>
            
            
        );
    }
}


export default HomeScreen;

const styles = StyleSheet.create({
    home_container: {
        flex: 1,
        backgroundColor: '#FFCB77',
        width: screenWidth,
        height: "100%"
    },
    chart_container:{
        alignItems:"center",
        marginVertical:30,
    },
    home_text_bar:{
        backgroundColor:"#B6D3DD",
        width:screenWidth*0.7,
        height:screenHeight*0.1,
        alignSelf:"center",
        justifyContent:"center"
    },
    home_text:{
        fontSize:20,
        fontWeight:"800",
        alignSelf:"center",
        textAlign:"center",
        lineHeight:30,
        letterSpacing:1.5
    },
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
    }
});

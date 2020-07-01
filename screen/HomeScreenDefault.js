import React,{Component, useEffect,useState,useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView,Image, ScrollView,FlatList,Modal, TouchableOpacity, ImageBackground} from 'react-native';



import cleanData from '../component/cleanData'
import HomeData from './HomeDataScreen'
import AddListModal from '../component/addListModal'
import FloatingButton from '../component/floatingButton'
import Fire from '../component/fire'

import Pie from 'react-native-pie'
import VitoryPie, { VictoryPie } from "victory-native"
import { ThemeConsumer } from 'react-native-elements';

import { StoreContext, StoreProvider } from "../src/stores";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let count = 25;


class HomeScreenDefault extends Component {
    
    state={
        isLogin:this.props.isLogin
    }
   
    state = {
        addTodoVisible : false,
        lists: cleanData,
        //lists: [],
        user: {},
        loading:true,
        
        
        
    };

    componentDidMount(){
        firebase = new Fire((error,user) => {
            if(error){
                return alert("哇 好像哪裡出錯了...");
            }

            firebase.getLists(lists => {
                this.setState({  user }, () => {
                    this.setState({ loading: false });
                });
            });
            
            this.setState({user});
        });
    }

    componentWillUnmount(){
        firebase.detach();
    }

    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible });
    }

    renderList =list =>{
        return <HomeData list={list} updateList={this.updateList}/>
    }

    updateList = list =>{
        //firebase.updateList(list);
        this.setState({
            lists:this.state.lists.map(item =>{
                return item.id === list.id ? list : item
            })
        })
    };

    addList(list,nowid) {
        //firebase.addList(list,nowid)
    }
    // addDoc = db.collection('cities').add({
    //     name: 'Tokyo',
    //     country: 'Japan'
    //   })
      

   
    
    

    render (){
       
        let totalSafe = 0;
        let totalNormal = 0;
        let totalDanger = 0;
        let totalQuantity = 0;
        this.state.lists.forEach((item) => {
            totalSafe += item.todos.filter(todo => todo.safe).length;
            totalNormal += item.todos.filter(todo => todo.normal).length;
            totalDanger += item.todos.filter(todo => todo.danger).length;
            totalQuantity += item.todos.filter(todo => todo.title).length;
            //totalQuantity += item.safe2;
            //totalPrice += item.quantity * item.price;
        })
        let chattext = "\n恩(´-ω-`)整潔度ㄧ般般\n一起朝質感生活邁進吧！"
        if(totalSafe/totalQuantity>=0.8){
            chattext = "\n太優秀了你很整潔\n賜予你乾淨博美的封號"
        }
        else if(totalDanger/totalQuantity>=0.4){
            chattext = "\n邋遢鬼是吉娃娃\n你是吉娃娃嗎？"
        }

        else if(totalNormal/totalQuantity>=0.4&&totalNormal/totalQuantity<0.8){
            chattext = "\n整潔度普普通通喔！\n想繼續當吉娃娃是嗎？"
        }
                
        const defaultData =[
            {x:totalSafe/totalQuantity,y:100},
            {x:"normal",y:0},
            {x:"danger",y:0}

        ];
        const sampleData =[
            {x:[totalSafe],y:totalSafe},
            {x:totalNormal,y:totalNormal},
            {x:totalDanger,y:totalDanger}

        ];
        const dataColor=[
            "#9FD47C","#FFE047","#F16464"
        ];
        
        const navigation = this.props
        const nowlist = this.state.lists
        return(
            
            <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    <Modal 
                    animationType="slide" 
                    transparent={true}
                    //visible={true}
                    visible={this.state.addTodoVisible} 
                    onRequestClose={()=>this.state.toggleAddTodoModal()}
                    >
                        <AddListModal list={this.state.lists} 
                        closeModal={()=> this.toggleAddTodoModal()} 
                        addList={this.addList}
                        updateList={this.updateList}
                        />
                    </Modal>
                    <View style={{height:screenHeight*0.86}}>
                    <FlatList 
                    ListHeaderComponent={
                        <>
                            <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#FFCB77"}}>
                            <SafeAreaView style={{ backgroundColor: '#FFCB77' }}/>
                            <Image
                                    source={require('../assets/img/img_logo.png')} 
                                    style = {styles.chart_back}
                                    />
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
                                    <ImageBackground
                                    source={require('../assets/img/img_chatbar.png')} 
                                    style = {styles.chatbar}
                                    >
                                        {/* <Text style={styles.home_text}>{"\n"}安全已佔四成,{"\n"}相信還可以更多! :)</Text> */}
                                        <Text style={styles.home_text}>{chattext}</Text>
                                    </ImageBackground>
                                
                                
                                </View>
                                <View style={styles.dirty_con}>
                                      <Text style={styles.dirty_text}>髒鬼警報</Text>
                                </View>
                                <View style={styles.item_con}>
                                      <View>
                                        <Text style={styles.item_text1}>毛巾<Text style={styles.item_text2}>(爸爸)</Text></Text>
                                      </View>
                                      <View>
                                      <Text style={styles.item_text3}>剩<Text style={styles.item_text4}>2</Text>天</Text>
                                      </View>
                                </View>
                                <View style={styles.item_con}>
                                      <View>
                                        <Text style={styles.item_text1}>牙刷<Text style={styles.item_text2}>(爸爸)</Text></Text>
                                      </View>
                                      <View>
                                      <Text style={styles.item_text3}>剩<Text style={styles.item_text4}>5</Text>天</Text>
                                      </View>
                                </View>
                                
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
                        
                        
                            <FloatingButton
                            navigation = {this.props.navigation}
                            />
                           
                        <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text style={styles.page_name_text}>首頁</Text>
                       </View>
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


export default HomeScreenDefault;

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
    chart_back:{
        position:"absolute",
        width:screenWidth*0.5,
        height:screenWidth*0.5,
        alignSelf:"center",
        marginTop:screenHeight*0.14,
        //paddingTop:-500,
        //backgroundColor:"red"
    },
    
    home_text_bar:{
        //backgroundColor:"#B6D3DD",
        width:screenWidth*0.7,
        height:screenHeight*0.15,
        alignSelf:"center",
        justifyContent:"center"
    },
    chatbar:{
        width:screenWidth*0.7,
        height:screenHeight*0.15,
    },
    home_text:{
        fontSize:20,
        fontWeight:"800",
        alignSelf:"center",
        textAlign:"center",
        lineHeight:35,
        letterSpacing:1.5,
        height:screenHeight*0.15,
        //backgroundColor:"red"
    },
    tab:{
        display:"flex",
        flexDirection:"row",
        height:screenHeight*0.12,
        alignItems:"flex-end",
        paddingBottom:screenHeight*0.04,
        

    },
    tab_btn:{
        width:30,
        height:30,
        margin:5,
        
        
    },
    page_name:{
      marginTop:screenHeight*0.01,
        alignItems:"center",
        height:40
    },
    page_name_text:{
      color:"transparent",
      fontSize:23,
      fontWeight:"500",
      textAlign:"center",
      lineHeight:40,
      letterSpacing:5
    },
    dirty_con:{
        width:screenWidth*0.4,
        height:screenHeight*0.05,
        borderRadius:10,
        backgroundColor:"#F16464",
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center"
    },
    dirty_text:{
        color:"white",
        fontSize:20,
        fontWeight:"500"
    },
    item_con:{
        width:screenWidth*0.8,
        height:screenHeight*0.07,
        borderRadius:10,
        backgroundColor:"#FEF9EF",
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10
    },
    item_text1:{
        marginLeft:20,
        fontSize:23,
        fontWeight:"800",
        letterSpacing:2
    },
    item_text2:{
        marginLeft:20,
        fontSize:16,
        fontWeight:"600",
        letterSpacing:2
    },
    item_text3:{
        marginLeft:20,
        fontSize:20,
        fontWeight:"400",
        letterSpacing:10,
        marginRight:20
    },
    item_text4:{
        marginLeft:20,
        fontSize:28,
        fontWeight:"900",
        letterSpacing:2,
        color:"#FF3737",
        letterSpacing:10,
    }
});

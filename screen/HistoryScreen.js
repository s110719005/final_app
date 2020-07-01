import React,{Component} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image,FlatList} from "react-native";

import FloatingButton from '../component/floatingButton'
import AddListModal from '../component/addListModal'
import Fire from '../component/fire'
import historyData from '../component/historyData'
import cleanData from '../component/cleanData'
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class HistoryScreen extends Component {
    
    state = {
        addTodoVisible : false,
        //lists: cleanData,
        lists: [],
        user: {},
        loading:true,
        
        
    };

    componentDidMount(){
        firebase = new Fire((error,user) => {
            if(error){
                return alert("哇 好像哪裡出錯了...");
            }

            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false });
                });
            });
            
            this.setState({user});
        });
    }

    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible });
    }

    addList(list,nowid) {
        firebase.addList(list,nowid)
    }

    renderTodo = (item) => {
        
            return (
                <View>
                    <Text>hi{item.username}hi</Text>
                </View>
            )
      }

    render (){
        const navigation = this.props
        const data = historyData
    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    <Modal 
                    animationType="slide" 
                    transparent={true}
                    //visible={true}
                    visible={this.state.addTodoVisible} 
                    onRequestClose={()=>this.state.toggleAddTodoModal()}
                    >
                        <AddListModal list={this.state.lists} closeModal={()=> this.toggleAddTodoModal()} addList={this.addList}/>
                    </Modal>
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#B8F2E6"}}>
                            <SafeAreaView style={{ backgroundColor: '#B8F2E6' }}/>
                            
                            <FlatList
                                data = {historyData}
                                inverted = {true}
                                keyExtractor={item => item.key} 
                                renderItem ={({item})=> 
                                    <View style={styles.chat_con}>
                                        <View style={styles.user_con}>
                                            <Image source={{uri:item.userpic}} 
                                                style={styles.user_pic}/> 
                                            <Text style={styles.user_name}>{item.username}</Text>
                                        </View>
                                        <View style={styles.action}>
                                            <Text style={styles.action_text}>{item.action}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.item_text}>{item.itemtitle}</Text>
                                            
                                        </View>
                                        <Text style={styles.date_text}>{item.date}</Text>


                                        

                                    </View>
                                }
                            />
                        </View>
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {this.props.navigation}
                            />
                           
                        <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text style={styles.page_name_text}>誰來整理</Text>
                        </View>
                        <TouchableOpacity onPress={()=> this.toggleAddTodoModal()}
                        >
                            <Image source={require('../assets/btn/btn_add.png')} 
                            style={styles.tab_btn}/>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView/> 
            </View>
    );
    }
}

const styles = StyleSheet.create({
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
      color:"white",
      fontSize:23,
      fontWeight:"500",
      textAlign:"center",
      lineHeight:40,
      letterSpacing:5
    },
    chat_con:{
        backgroundColor:"#FFD2CE",
        width:screenWidth*0.75,
        height:screenHeight*0.12,
        alignSelf:"center",
        margin:10,
        borderRadius:15,
        display:"flex",
        flexDirection:"row"
    },
    user_con:{
        alignItems:"center",
        width:screenWidth*0.2,
        height:screenHeight*0.12,
        justifyContent:"center",
        //backgroundColor:"green"
    },
    user_pic:{
        width:screenWidth*0.15,
        height:screenWidth*0.15,
        //backgroundColor:"red"
    },
    user_name:{
        margin:0,
        color:"#565656",
        //backgroundColor:"red",
        paddingTop:10
    },
    action:{
        alignItems:"center",
        width:screenWidth*0.35,
        height:screenHeight*0.12,
        justifyContent:"center",
        //backgroundColor:"red"
    },
    action_text:{
        fontSize:23
    },
    item:{
        alignItems:"center",
        width:screenWidth*0.2,
        height:screenHeight*0.12,
        justifyContent:"center",
        //backgroundColor:"red"
    },
    item_text:{
        fontSize:23
    },
    date_text:{
        fontSize:14,
        position:"absolute",
        color:"#565656",
        marginLeft:screenWidth*0.51,
        marginTop:screenHeight*0.088
    },

    });

export default HistoryScreen;
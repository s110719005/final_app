import React,{Component} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image} from "react-native";

import FloatingButton from '../component/floatingButton'
import AddListModal from '../component/addListModal'
import Fire from '../component/fire'
import cleanData from '../component/cleanData'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class HistoryScreen extends Component {
    
    state = {
        addTodoVisible : false,
        lists: cleanData,
        //lists: [],
        user: {},
        loading:true,
        
        
    };

    // componentDidMount(){
    //     firebase = new Fire((error,user) => {
    //         if(error){
    //             return alert("哇 好像哪裡出錯了...");
    //         }

    //         firebase.getLists(lists => {
    //             this.setState({ lists, user }, () => {
    //                 this.setState({ loading: false });
    //             });
    //         });
            
    //         this.setState({user});
    //     });
    // }

    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible });
    }

    render (){
        const navigation = this.props
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
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"#FFCB77"}}>
                            <SafeAreaView style={{ backgroundColor: '#FFCB77' }}/>
                            <Text>hi</Text>
                                
                        </View>
                            
                            
                        
                    
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {this.props.navigation}
                            />
                           
                       <View style={{width:screenWidth*0.7}}></View>
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
        paddingBottom:screenHeight*0.04

    },
    tab_btn:{
        width:30,
        height:30
    }

    });

export default HistoryScreen;
import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList,Dimensions,Animated, KeyboardAvoidingView } from 'react-native';
import {swipeable, TouchableOpacity} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class FlatlistDetail extends Component {
  state = {
      genre: this.props.list.genre,
      todos: this.props.list.todos
  }

  renderTodo = (todo,index) => {
    let buttonBg ;
    if(todo.safe===true) {
        buttonBg = "#9FD47C"
    }
    else if(todo.normal===true){
        buttonBg = "#FFCB77"
    }
    else if(todo.danger===true){
        buttonBg = "#F16464"
    }
        return (
            <Swipeable
             renderLeftActions ={(_, dragX)=> this.leftActions(dragX, index)}
            >
            <View style={styles.todolist_container}>
                <View style={[styles.circle,{backgroundColor:buttonBg}]}></View>
                <View style={styles.todolist_text_container}>
                    <Text style={styles.todolist_text}>{todo.title}
                        <Text style={styles.todolist_text2}>({todo.note})</Text>
                    </Text>
                    
                    <View style={styles.todolist_text3_con}>
                        <Text style={styles.todolist_text3}>使用  </Text>
                            <Text style={styles.todolist_text4}>{todo.day}</Text>
                        <Text style={styles.todolist_text3}>天 </Text>
                    </View>


                </View>

            </View>
            </Swipeable>
        )
  }

  deleteTodo = (index)=>{
    let list = this.props.list
    list.todos.splice(index,1)

    this.props.updateList(list)
  }

  leftActions = (dragX,index) =>{
      
    return (
        <TouchableOpacity
        onPress={() => this.deleteTodo(index)}
        >
            <Animated.View style = {styles.delete_btn}>
                
                <Animated.Image
                style = {styles.delete_img}
                source={require('../assets/btn/btn_delete.png')}
                ></Animated.Image>
                <Animated.Text style = {styles.delete_text}>刪除</Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    )
  }

  render() {
    const todo = this.state.todos
    const list = this.props.list
    return (
        

        
      <View>
        <FlatList
            data = {this.props.list.todos}
            renderItem ={({item,index})=> this.renderTodo(item,index) }
            //keyExtractor = {item => item.key}
            keyExtractor = {(_, index) => index.toString}
            updateList={list}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    todolist_container:{
        height:screenHeight*0.13,
        borderRadius:10,
        backgroundColor:"#FEF9EF",
        marginBottom:20,
        width:screenWidth*0.9,

        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
        height: 3,
        width: 2,}

    },
    todolist_text_container:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        height:screenHeight*0.13,

    },
    todolist_text:{
        fontSize:23,
        fontWeight:"800",
        width:"50%",
        marginLeft:"10%"

    },
    todolist_text2:{
        fontSize:15,
        fontWeight:"600",
        color:"#565656"

    },
    todolist_text3:{
        fontSize:15,
        fontWeight:"600",
        lineHeight:40,
        textAlign:"center"
    },
    todolist_text4:{
        fontSize:35,
        fontWeight:"800",
        width:70,
        justifyContent:"center",
        textAlign:"center",
    },
    todolist_text3_con:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        width:"45%",
        marginRight:"10%"
    },
    circle:{
        position:"absolute",
        marginLeft:screenWidth*0.83,
        marginTop:screenHeight*0.008,
        //backgroundColor:buttonBg,
        width:20,
        height:20,
        borderRadius:20/2,
        borderWidth:2,
        borderColor:"#A6A6A6"
    },
    delete_btn:{
        backgroundColor:"#FE6D73",
        //flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:60,
        height:screenHeight*0.13,
        marginRight:10,
        borderRadius:10
    },
    delete_img:{
        height:30,
        width:27
    },
    delete_text:{
        color:"white",
        marginTop:10,
        fontWeight:"500"
    },

});
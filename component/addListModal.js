import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView ,StyleSheet, SafeAreaView,Dimensions, TouchableOpacity,TextInput,Image,TouchableWithoutFeedback, FlatList,Alert} from 'react-native';
import DatePicker from 'react-native-datepicker'
import cleanData from '../component/cleanData'
import * as firebase from "firebase";
import Fire from '../component/fire'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

let count = 25;

const firebaseConfig = {
    apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
      authDomain: "appfinal-23a98.firebaseapp.com",
      databaseURL: "https://appfinal-23a98.firebaseio.com",
      projectId: "appfinal-23a98",
      storageBucket: "appfinal-23a98.appspot.com",
      messagingSenderId: "235000499477",
      appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const componentDidMount = () =>{
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
};

export default class addListModal extends Component {
    
    
    
    onIncrement = () => {
        this.setState({
            due_date_count: this.state.due_date_count + 1,
        })
      };

      onDecrement = () => {
        this.setState({
            due_date_count: this.state.due_date_count - 1,
            
        })
        
      };
    
    state = {
        new_title:null,
        new_note:null,
        note:this.props.list.note,
        day:this.props.list.date,
        //lists:cleanData,
        new_safe:null,
        new_normal:null,
        new_danger:null
        
        
    }

   

    addTodo = (dleft=day_left) =>{
        
        if(this.state.nowtodo!==null&&this.state.new_title!==null){
            if(dleft/this.state.due_date_count <=0.3){
                
                    this.state.safe=true,
                    this.state.normal=false,
                    this.state.danger=false
                
            }
            else if(dleft/this.state.due_date_count >0.3 && dleft/this.state.due_date_count <=0.6){
                this.state.safe=false,
                    this.state.normal=true,
                    this.state.danger=false
            }
            else if(dleft/this.state.due_date_count >0.6){
                this.state.safe=false,
                    this.state.normal=false,
                    this.state.danger=true
            }
            
            // this.state.nowtodo.push({
            //     key:count,
            //     title: this.state.new_title,
            //     day:dleft,
            //     note:this.state.new_note,
            //     due:this.state.due_date_count,
            //     safe:this.state.safe,
            //     normal:this.state.normal,
            //     danger:this.state.danger
            // })

            const key = count
            const title = this.state.new_title
            const day=dleft
            const note=this.state.new_note
            const due=this.state.due_date_count
            const safe=this.state.safe
            const normal=this.state.normal
            const danger=this.state.danger
            const list = {key,title,day,note,due,safe,normal,danger}
            const nowid = this.state.nowid

            this.props.addList(nowid,list);

            // let db = firebase.firestore();
            // var ref = db.collection("users").doc(firebase.auth().currentUser.uid).collection("lists").doc(this.state.nowid).collection("todos");
            // ref.set({
                
            //         key:count,
            //         title: this.state.new_title,
            //         day:dleft,
            //         note:this.state.new_note,
            //         due:this.state.due_date_count,
            //         safe:this.state.safe,
            //         normal:this.state.normal,
            //         danger:this.state.danger
                
                
            // })
            

            //this.props.updateList(this.props.list)
            
            count++;
            if(this.state.keepinput===false){
                this.props.closeModal()
            }
            
            
        }
        else{
            Alert.alert(
                "錯誤",
                "請填寫完整再按儲存！",
                [
                  
                  { text: "好", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
        
        this.setState({
            new_title:null,
            //count:"ya" ,
            nowtodo:null,
            nowid:null,
            safe:null,
            normal:null,
            danger:null,
            selectedItem:0,
            new_note:null
        });
        
        
    };
    
    constructor(props){
        super(props)
        var tdate = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.state ={
            date:year + '/' + month + '/' + tdate,
            today:year + '/' + month + '/' + tdate,
            item_name:"",
            due_date_count:30,
            
            nowgenre:this.props.list.genre,
            nowtodo:null,
            nowid:null,
            selectedItem:0,
            keepinput:false
            
        }
        
      }

      handleSelection = (id) => {
        var selectedId = this.state.selectedId
     
        if(selectedId === id)
          this.setState({selectedItem: null})
        else 
          this.setState({selectedItem: id})
     }

  render() {
      const {nowgenre,today,date,selectedItem,new_title} = this.state;
      if(this.state.due_date_count<0){
            this.state.due_date_count=0
      }
    // const start = new Date(2011, 2, 5);
    // const end = new Date(2011, 5, 5);
    // const range = moment.range(start, end);
    // //Then could get the difference by doing something like
    // //range = range.diff('months'); // 3
    // range = range.diff('days'); // 92

    var d1 = new Date(today) //firstDate
    var d2 = new Date(date) //SecondDate
    var day_left = Math.abs(d1-d2)/86400000; //in milliseconds
    
    
    return (
       
        <KeyboardAvoidingView style={styles.modal_add}>
            <SafeAreaView/>
            <TouchableOpacity onPress={this.props.closeModal}>
                <View style={{width:25,height:25,alignSelf:"flex-end",margin:30}}>
                <Image source={require('../assets/btn/btn_close.png')} 
                                style={styles.minus_plus}/>
                </View>
            </TouchableOpacity>
                <View style={styles.modal_container}>
                    
                    <View style={styles.date}>
                        <Text style={styles.title_text}>日期</Text>
                        <View style={styles.datepicker}>
                            <DatePicker
                                style={{
                                    width: 150,
                                }}
                                date={this.state.date}
                                mode="date"
                                placeholder={this.state.today}
                                format="YYYY/MM/DD"
                                minDate="2016/05/01"
                                maxDate={this.state.today}
                                confirmBtnText="確定"
                                cancelBtnText="取消"
                                showIcon={false}
                                onDateChange
                                customStyles={{
                                    datePicker:{
                                        backgroundColor:"#737373"
                                    },
                                dateInput: {
                                    width:50,
                                    marginLeft: 30,
                                    borderWidth: 0,
                                },
                                dateText:{
                                    fontSize:20,
                                    fontWeight:"700"
                                    
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                    </View>

                    {/* genre */}
                    <View style={styles.genre}>
                    <FlatList
                        data={this.props.list} 
                        keyExtractor={item => item.genre} 
                        horizontal={true} 
                        extraData={
                            this.state.selectedId=0     // for single item
                            
                          }
                        renderItem={({item}) => 
                        <TouchableOpacity 
                        //style={styles.genre_text_con}
                        style={selectedItem === item.id ? styles.genre_text_con2 : styles.genre_text_con} 
                        onPress={()=>{this.setState({nowgenre:item.genre,nowtodo:item.todos,nowid:item.no})}}
                        onPressIn={() => this.handleSelection(item.id)}
                        >
                            <View ><Text style={styles.genre_text}>{item.genre}</Text></View>
                            </TouchableOpacity>
                             }
                    />
                    </View>

                    {/* item_name */}
                    <View style={styles.item}>
                        <TextInput style={styles.title_text}
                        placeholder="物品名稱"
                        onChangeText={text => this.setState({new_title: text})}
                        value={this.state.new_title}
                        />
                    </View>

                    {/* due */}
                    <View style={styles.due}>
                        <Text style={styles.title_text}>期限</Text>
                        <View style={styles.due_count}>
                        <TouchableOpacity 
                            onPress={this.onDecrement}
                        >
                            <Image source={require('../assets/btn/btn_minus.png')} 
                                style={styles.minus_plus}/>
                        </TouchableOpacity>
                            <Text style={styles.title_text}>{this.state.due_date_count}</Text>
                        
                            <TouchableOpacity 
                            onPress={this.onIncrement}
                        >
                             
                            <Image source={require('../assets/btn/btn_plus.png')} 
                                style={styles.minus_plus}/>
                        </TouchableOpacity>
                            <Text style={styles.title_text}>天</Text>
                        </View>
                    </View>

                    {/* who's */}
                    <View style={styles.who}>
                        <Text style={styles.title_text}>是誰的呢？</Text>
                    </View>

                    {/* remind */}
                    <View style={styles.remind}>
                        <Text style={styles.title_text}>備註</Text>
                    </View>
                    <View style={styles.remind2}>
                        <TextInput style={styles.title_text}
                        placeholder="ex.品牌名稱"
                        onChangeText={note => this.setState({new_note: note})}
                        value={this.state.new_note}
                        ></TextInput>
                    </View>
                    
                    {/* <Text>{nowgenre}hihi </Text>
                    <Text> day_left:{day_left} </Text>
                    <Text> count:{count} </Text>
                    <Text>newtitle: {new_title} </Text>
                    <Text>due: {this.state.due_date_count} </Text> */}


                    {/* save */}
                    <View style={{alignItems:"center"}}>
                    <TouchableOpacity
                    onPress={() => this.addTodo(day_left)}
                    onPressIn={() => this.setState({keepinput:true})}
                    >
                        <View style={styles.save_btn}>
                            <Text style={styles.save_btn_text}>儲存&繼續</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.addTodo(day_left,this.state.item)}
                        onPressIn={() => this.setState({keepinput:false})}
                        >
                        <View style={styles.save_btn}>
                            <Text style={styles.save_btn_text}>儲存</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            
        </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
    modal_add:{
        height:screenHeight*0.95,
        backgroundColor:"#FEF9EF",
        marginTop:screenHeight*0.07,
        borderRadius:20
    },
    modal_container:{
        paddingHorizontal:30
    },
    save_btn:{
        backgroundColor:"#FFA69E",
        width:screenWidth*0.4,
        height:screenHeight*0.06,
        borderRadius:screenHeight*0.03,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
        
    },
    save_btn_text:{
        fontSize:20,
        letterSpacing:2,
        fontWeight:"700"
    },
    title_text:{
        fontSize:22,
        fontWeight:"700"
        
    },
    date:{
        backgroundColor:"#9DD5DF",
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        display:"flex",
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        marginBottom:15
        
        
    },
    datepicker:{
    },
    genre:{
        display:"flex",
        flexDirection:"row",
        width:screenWidth*0.8,
        alignSelf:"center",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:15
    },
    genre_text:{
        
        textAlign:"center",
        lineHeight:screenWidth*0.10,
        fontSize:16,
        fontWeight:"500"
       
    },
    genre_text_con:{
        width:screenWidth*0.18,
        height:screenHeight*0.05,
        backgroundColor:"#B8F2E6",
        borderRadius:10,
        alignSelf:"center",
        marginRight:screenWidth*0.027
    },
    genre_text_con2:{
        width:screenWidth*0.18,
        height:screenHeight*0.05,
        backgroundColor:"#73D1BD",
        borderRadius:10,
        alignSelf:"center",
        marginRight:screenWidth*0.027
    },
    item:{
        backgroundColor:"#9DD5DF",
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        alignSelf:"center",
        alignItems:"flex-end",
        justifyContent:"center",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        marginBottom:15
    },
    due:{
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        display:"flex",
        flexDirection:"row",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        marginBottom:15
    },
    minus_plus:{
        width:20,
        height:20,
        marginTop:2,
        marginRight:7,
        marginLeft:7
    },
    due_count:{
        display:"flex",
        flexDirection:"row",
    },
    who:{
        backgroundColor:"#B8F2E6",
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        alignSelf:"center",
        justifyContent:"center",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        marginBottom:15
    },
    remind:{
        backgroundColor:"#B8F2E6",
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        alignSelf:"center",
        justifyContent:"center",
        paddingLeft:10,
        paddingRight:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    remind2:{
        backgroundColor:"white",
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        alignSelf:"center",
        justifyContent:"center",
        paddingLeft:10,
        paddingRight:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    }
});





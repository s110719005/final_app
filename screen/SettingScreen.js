import React,{useState,useEffect,useContext,createContext} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,SafeAreaView,Modal,Image,AsyncStorage,Button} from "react-native";

import FloatingButton from '../component/floatingButton'
import { Switch } from 'react-native-switch';
import RNPickerSelect from 'react-native-picker-select';



import { StoreContext } from "../src/stores";
import * as firebase from "firebase";




let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


// Initialize Firebase
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

export const Dropdown = () => {
    return (
        <RNPickerSelect
            placeholder= {{label: '未設定', value: null,color:"black" }}
            
            placeholderTextColor="white"
            style={{
                inputIOS: {
                    fontSize: 16,
                    width:75,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    marginLeft:5,
                    color: 'white',
                    //paddingRight: 30, // to ensure the text is never behind the icon
                },
                placeholder: {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft:5
                },
            
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '一週前', value: 'football',color:"black" },
                { label: '兩週前', value: 'baseball',color:"black" },
                { label: '三週前', value: 'hockey',color:"black" },
            ]}
        />
    );
};

const SettingScreen = ({navigation}) => {
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    

    return(
        <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#227C9D",alignItems: 'center',justifyContent:"center",flex:1}}>
                    
                    <View style={{height:screenHeight*0.86}}>
                    
                        <View style={{width:screenWidth,height:screenHeight*0.86,backgroundColor:"red"}}>
                            <View style={styles.container}>
                                <SafeAreaView style={{ backgroundColor: '#FEF9EF' }}/>
                                <View style={{width:40,height:40,marginTop:screenWidth*0.1,marginLeft:screenWidth*0.05}}>
                                    <TouchableOpacity
                                    onPress={()=> navigation.goBack("User")}
                                    >
                                    <Image source={require('../assets/btn/btn_goback.png')} 
                                        style={styles.goback_btn}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.set_con}>
                                    <View style={styles.set_con_con}>
                                        <Text style={styles.set_con_text}>到期前提醒</Text>
                                        {/* <Switch
                                            trackColor={{ false: "red", true: "#FFE0E0" }}
                                            thumbColor={isEnabled ? "#FFA69E" : "#FFE0E0"}
                                            ios_backgroundColor="#FFA69E"
                                            style={{ transform:[{ scaleX: 1 }, { scaleY: 1 }] }}
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        /> */}
                                        <Switch
                                            value={isEnabled}
                                            onValueChange={toggleSwitch}
                                            //disabled={false}
                                            activeText={'On'}
                                            inActiveText={'Off'}
                                            circleSize={35}
                                            barHeight={40}
                                            circleBorderWidth={0}
                                            backgroundActive={'#FFE0E0'}
                                            backgroundInactive={'#FFA69E'}
                                            circleActiveColor={'#FFA69E'}
                                            circleInActiveColor={'#FFE0E0'}
                                            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                    
                                            renderActiveText={false}
                                            renderInActiveText={false}
                                            switchLeftPx={1.8} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                            switchRightPx={1.8} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                            switchWidthMultiplier={2.3} // multipled by the `circleSize` prop to calculate total width of the Switch
                                            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                                        />
                                    </View>
                                    <View style={styles.set_con_con}>
                                        <Text style={styles.set_con_text}>提醒時間</Text>
                                        <View style={styles.set_btn}>
                                            <TouchableOpacity
                                            onPress = {Dropdown}
                                            >
                                            {/* <Text style={styles.set_btn_text}>未設定</Text> */}
                                            <Dropdown></Dropdown>
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </View>
                                   
                                    
                                    
                                    
                                </View>
                                <View style={styles.save_con}>
                                    <TouchableOpacity>
                                    <Text style={styles.logout}>儲存</Text>
                                    </TouchableOpacity>
                                </View>
                                        
                                       
                                
                            </View>
                    </View>
                    </View>
                    
                    
                    <View style={styles.tab}>
                        
                        
                            <FloatingButton
                            navigation = {navigation}
                            />
                           
                       <View style={[{width:screenWidth*0.7},styles.page_name]}>
                           <Text style={styles.page_name_text}>設定</Text>
                       </View>
                       <TouchableOpacity 
                        >
                            <Image source={require('../assets/btn/btn_add.png')} 
                            style={styles.tab_btn}/>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView/> 
            </View>
    );
    
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
      letterSpacing:5,
      
    },
    container: {
        flex: 1,
        backgroundColor: '#FEF9EF',
      },
      goback_btn:{
        width:40,
        height:40,
      },
      set_con:{
        alignItems:"flex-start",
        marginTop:screenHeight*0.2
    },
    set_con_con:{
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        marginLeft:screenWidth*0.1
    },
    set_con_text:{
        color:"#5E5E5E",
        fontSize:23,
        fontWeight:"500",
        letterSpacing:5,
        margin:screenHeight*0.02,
        width:screenWidth*0.48,
        //backgroundColor:"red"
    },
    set_btn:{
        backgroundColor:"#FFA69E",
        borderRadius:20

    },
    set_btn_text:{
        fontSize:20,
        padding:10,
        color:"white"
    },
    picker:{
        color:"white",
        fontSize:20 ,
        width:50
    },
    save_con:{
        alignItems:"center",
        marginTop:screenHeight*0.05
    },
    logout:{
        color:"#5E5E5E",
        backgroundColor:"#B8F2E6",
        width:screenWidth*0.38,
        height:screenHeight*0.05,
        textAlign:"center",
        fontSize:23,
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop:15,
        borderColor:"#707070",
        borderRadius:screenHeight*0.025,
        borderWidth:2,
        overflow: "hidden",
      },
      

    });

export default SettingScreen;
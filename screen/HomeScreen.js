import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView,Image, ScrollView,FlatList} from 'react-native';



import cleanData from '../component/cleanData'
import HomeData from './HomeDataScreen'

import Pie from 'react-native-pie'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class HomeScreen extends Component {
    
    render (){
        
        let totalSafe = 0;
        let totalNormal = 0;
        let totalDanger = 0;
        let totalQuantity = 0;
        let safeCount = 0;
        cleanData.forEach((item) => {
            totalSafe += item.todos.filter(todo => todo.safe).length;
            totalNormal += item.todos.filter(todo => todo.normal).length;
            totalDanger += item.todos.filter(todo => todo.danger).length;
            totalQuantity += item.todos.filter(todo => todo.title).length;
            safeCount = item.todos.filter(todo => todo.safe).length;
            //totalQuantity += item.safe2;
            //totalPrice += item.quantity * item.price;
        })
        return(
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                style={{backgroundColor:"#FFCB77"}}
            >
            <View style={{width:screenWidth,height:screenHeight}}>
                <SafeAreaView style={{ backgroundColor: '#7FB134' }}/>
                <View>
                    <Text>整潔：{totalSafe} </Text>
                    <Text>普通：{totalNormal} </Text>
                    <Text>髒亂：{totalDanger} </Text>
                    <Text>全部：{totalQuantity} </Text>
                    {/* <Pie
                        radius={80}
                        innerRadius={60}
                        sections={[
                            {
                            percentage: 10,
                            color: '#C70039',
                            },
                            {
                            percentage: 20,
                            color: '#44CD40',
                            },
                            {
                            percentage: 30,
                            color: '#404FCD',
                            },
                            {
                            percentage: 40,
                            color: '#EBD22F',
                            },
                        ]}
                        dividerSize={6}
                        strokeCap={'butt'}
                    /> */}
                </View>
                <View style={styles.home_text_bar}>
                 <Text style={styles.home_text}>安全已佔四成,{"\n"}相信還可以更多! :)</Text>
                </View>
            </View>


            <View style={{width:screenWidth,height:screenHeight,backgroundColor:"#FFCB77",alignItems: 'center',justifyContent:"center",flex:1}}>
                    <FlatList 
                    data={cleanData} 
                    keyExtractor={item => item.genre} 
                    pagingEnabled={true}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        
                        <View style={styles.home_container}>
                        <SafeAreaView style={{ backgroundColor: '#7FB134' }}/>
                        <View style={styles.header}>
                            <View>
                                <Image source={require('../assets/img/img_bathroom.png')} style={styles.header_pic}/>
                            </View>
                            <View style={styles.header_title}>
                                <Image source={require('../assets/btn/btn_toleft.png')} style={styles.header_btn}/>
                                <Text style={styles.header_text}>{item.genre}</Text>
                                
                                <Image source={require('../assets/btn/btn_toright.png')} style={styles.header_btn}/>
                            </View>
                            <Text>整潔：{safeCount} </Text>
                            {/* <FlatList 
                            data={item.todos} 
                            keyExtractor={item => item.key} 
                            renderItem={({item}) => <Text>{item.title}</Text> }
                            /> */}
                            <Text>整潔：{safeCount} </Text>
                        </View>
                </View>


                    ) }
                    />
            </View>
                

            
             </ScrollView>
            
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
    home_container: {
        flex: 1,
        backgroundColor: '#FFCB77',
        width: screenWidth,
        height: "100%"
    },
    header:{
        paddingTop:"7%",
        alignItems: 'center',
    },
    header_pic:{
        width:83,
        height:58
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
    }
});

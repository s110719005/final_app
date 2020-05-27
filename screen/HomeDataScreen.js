import React from "react";
import { StyleSheet, Text, View, Image, Dimensions,SafeAreaView,FlatList} from "react-native";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;



const HomeDataScreen = ({clean}) => {
    
    const safeCount = clean.todos.filter(todo => todo.safe).length;
    

    return(
        <View style={styles.home_container}>
                <SafeAreaView style={{ backgroundColor: '#7FB134' }}/>
                <View style={styles.header}>
                    <View>
                        <Image source={require('../assets/img/img_bathroom.png')} style={styles.header_pic}/>
                    </View>
                    <View style={styles.header_title}>
                        <Image source={require('../assets/btn/btn_toleft.png')} style={styles.header_btn}/>
                        <Text style={styles.header_text}>{clean.genre}</Text>
                        
                        <Image source={require('../assets/btn/btn_toright.png')} style={styles.header_btn}/>
                    </View>
                    <Text>整潔：{safeCount} </Text>
                    <FlatList 
                    data={clean.todos} 
                    keyExtractor={item => item.title} 
                    renderItem={({item}) => <Text>{item.title}</Text> }
                    />
                    <Text>整潔：{safeCount} </Text>
                </View>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
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

export default HomeDataScreen;
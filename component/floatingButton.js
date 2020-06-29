import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Animated,TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

export default class floatingButton extends Component {
    
    animation = new Animated.Value(0)

    toggleMenu=() => {
        const toValue = this.open ? 0 : 1
        Animated.spring(this.animation,{
            toValue,
            friction:5
        }).start()

        this.open = !this.open;
    }

  render() {
    const pinStyle={
        transform:[
            {
                scale: this.animation
            },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange : [0,-90]
                })
            }
        ]
    }

    const pinStyle2={
        transform:[
            {
                scale: this.animation
            },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange : [0,-150]
                })
            }
        ]
    }

    const pinStyle3={
        transform:[
            {
                scale: this.animation
            },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange : [0,-210]
                })
            }
        ]
    }

      const rotation = {
          transform: [
             { rotate: this.animation.interpolate({
                  inputRange: [0,1],
                  outputRange : ["0deg","45deg"]
              })}
          ]
      }
    return (
      <View style={styles.tab_con}>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
          >
              <Animated.View style={[styles.button,styles.menu,pinStyle3]}>
                <Image source={require('../assets/btn/btn_home.png')} 
                style={[styles.tab_btn]}/>
              </Animated.View>
            
          </TouchableOpacity>
          
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Account')}
          >
              <Animated.View style={[styles.button,styles.menu,pinStyle2]}>
                <Image source={require('../assets/btn/btn_user.png')} 
                style={[styles.tab_btn]}/>
              </Animated.View>
            
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('History')}
          >
              <Animated.View style={[styles.button,styles.menu,pinStyle]}>
                <Image source={require('../assets/btn/btn_history.png')} 
                style={[styles.tab_btn]}/>
              </Animated.View>
            
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleMenu} >
              <Animated.View style={[styles.button,styles.menu]}>
                <Image source={require('../assets/btn/btn_menu.png')} 
                style={[styles.tab_menu]}/>
              </Animated.View>
            
          </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    tab_con:{
        alignItems:"center"
    },
    tab_menu:{
        width:40,
        height:40,
        backgroundColor:"#227C9D"
    },
    tab_btn:{
        position:"absolute",
        width:40,
        height:40,
        marginLeft:-20
    },
});

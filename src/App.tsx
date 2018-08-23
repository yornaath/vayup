import React from 'react'
import { StyleSheet, View, Image, Dimensions, Text, Animated } from 'react-native'
import Breath from './containers/Breath'
import {LinearGradient} from 'expo'

const screen = Dimensions.get("screen")


export default class App extends React.Component {

  state = {
    menuOpen: true
  }

  animation = new Animated.Value(1)

  render() {

    const screenOffset = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [screen.width - 200, 0]
    })

    return (
      <View style={[styles.container]}>
        
          <View style={styles.contentContainer}>

            <View style={styles.menuContainer}>
              <Text>menu</Text>
            </View>

            <Animated.View style={[styles.screenContainer, {transform: [{ translateX: screenOffset }] }]}>
              <Image source={require("../assets/title_logo.png")} style={styles.logoTitle} resizeMode={"contain"}/>
              <Breath/>
            </Animated.View>
            
          </View>

      </View>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoTitle: {
    position: "absolute",
    top: 40,
    width: 200,
    height: 40,
    left: (screen.width / 2) - 100
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row"
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screen.width,
    height: screen.height
  },
  screenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})

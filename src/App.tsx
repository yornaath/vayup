import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity } from 'react-native'
import Breath from './containers/Breath'
import {LinearGradient} from 'expo'
import {spacing, colors, heading} from './theme'

const screen = Dimensions.get("screen")

interface State {
  menuOpen: boolean
}

interface Props {

}

export default class App extends React.Component<Props, State> {

  menuAnimation = new Animated.Value(0)

  state = {
    menuOpen: false
  }

  menuButtonPress = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  componentWillUpdate(nextProps:Props, nextState:State) {
    if(nextState.menuOpen) {
      Animated.spring(this.menuAnimation, {
        toValue: 1
      }).start()
    }
    else {
      Animated.spring(this.menuAnimation, {
        toValue: 0
      }).start()
    }
  }

  render() {

    const menuScale = this.menuAnimation.interpolate({
      inputRange: [0,1],
      outputRange: [0, 42]
    })

    const innerMenuOpacity = this.menuAnimation.interpolate({
      inputRange: [0,1],
      outputRange: [0, 42]
    })

    const innerMenuScale = this.menuAnimation.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const innerMenuRotation = this.menuAnimation.interpolate({
      inputRange: [0,1],
      outputRange: ['-10deg', '0deg']
    })


    return (
      <LinearGradient 
        start={[0.1, 0.1]}
        end={[1,1]}
        colors={["rgb(255,255,255)", "rgb(235,235,235)"]}
        style={styles.container}>

        <Image source={require("../assets/title_logo.png")} style={styles.logoTitle} resizeMode={"contain"}/>

        <View style={styles.contentContainer}>
          <Breath/>
        </View>

        <Animated.View style={[styles.menuBackground, {transform: [{ scale: menuScale }] }]} />

        <TouchableOpacity onPress={this.menuButtonPress} style={styles.menuIcon}>
          <Image source={require("../assets/line-menu.png")} style={styles.menuIconImage} resizeMode={"contain"}/>
        </TouchableOpacity>
        innerMenuRotation
        <Animated.View style={[styles.menuContainer, {opacity: innerMenuOpacity}, {transform: [
          {scale: innerMenuScale},
          {rotate: innerMenuRotation}
        ]}]}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Just Breathe</Text>
            <Text style={styles.menuButtonDescription}>A guided and calming breath.</Text>
          </View>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Box Breath</Text>
            <Text style={styles.menuButtonDescription}>Relieve stress in the nervous system.</Text>
          </View>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Stress release</Text>
            <Text style={styles.menuButtonDescription}>Re-oxygenate your blood.</Text>
          </View>
        </Animated.View>


      </LinearGradient>
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
    top: 45,
    width: 200,
    height: 40,
    left: (screen.width / 2) - 100
  },
  menuIcon: {
    height: 24,
    width: 24,
    position: "absolute",
    top: 45,
    left: spacing.four
  },
  menuIconImage: {
    height: 24,
    width: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBackground: {
    backgroundColor: colors.blue,
    position: "absolute",
    top: 45,
    left: spacing.four,
    width: 24,
    height: 24,
    borderRadius: 24
  },
  menuContainer: {
    position: "absolute",
    top: 45 + + 24 + spacing.three,
    left: spacing.four
  },
  menuButtonContainer: {
    marginBottom: spacing.three
  },
  menuButtonText: {
    color: "white",
    fontSize: heading.one,
    marginBottom: spacing.one
  },
  menuButtonDescription: {
    color: "white",
    fontSize: heading.four
  }
})

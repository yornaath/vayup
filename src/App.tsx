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

  menuScale = new Animated.Value(0)

  state = {
    menuOpen: false
  }

  menuButtonPress = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  componentWillUpdate(nextProps:Props, nextState:State) {
    if(nextState.menuOpen) {
      Animated.spring(this.menuScale, {
        toValue: 42
      }).start()
    }
    else {
      Animated.spring(this.menuScale, {
        toValue: 0
      }).start()
    }
  }

  render() {
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

        <Animated.View style={[styles.menuBackground, {transform: [{ scale: this.menuScale }] }]} />

        <TouchableOpacity onPress={this.menuButtonPress} style={styles.menuIcon}>
          <Image source={require("../assets/line-menu.png")} style={styles.menuIconImage} resizeMode={"contain"}/>
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Just Breathe</Text>
          </View>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Box Breath</Text>
          </View>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>Detox Breath</Text>
          </View>
        </View>


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
    fontSize: heading.one
  }
})

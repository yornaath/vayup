
import React from 'react'
import { TouchableWithoutFeedback, Animated, View, StyleSheet } from 'react-native'
import BreathBall from './visualizations/BreathBall'
import { colors } from '../theme'


export interface Props {
  active: boolean
  onPress?: () => void
}

export interface State {
  
}

export default class VibrationIcon extends React.Component<Props, State> {

  innerValue = new Animated.Value(0)
  outerValue = new Animated.Value(0)
  pressValue = new Animated.Value(0)

  constructor(props:Props) {
    super(props)
    if(props.active) {
      this.innerValue.setValue(1)
      this.outerValue.setValue(1)
    }
    else {
      this.innerValue.setValue(0)
      this.outerValue.setValue(0)
    }
  }

  componentDidUpdate(lastProps:Props) {
    if(!lastProps.active && this.props.active) {
      this.animateToActive()
    }
    if(!this.props.active && lastProps.active) {
      this.animateToInActive()
    }
  }

  animateToActive() {
    Animated.spring(this.innerValue, { toValue: 1 }).start()
    setTimeout(() => {
      Animated.spring(this.outerValue, { toValue: 1 }).start()
    }, 100)
  }

  animateToInActive() {
    Animated.spring(this.innerValue, { toValue: 0 }).start()
    setTimeout(() => {
      Animated.spring(this.outerValue, { toValue: 0 }).start()
    }, 100)
  }

  onPressInHandler = () => {
    Animated.spring(this.pressValue, { toValue: 1 }).start()
  }

  onPressOutHandler = () => {
    Animated.spring(this.pressValue, { toValue: 0 }).start()
  }

  render() {

    const innerLeftX = this.innerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -9]
    })

    const innerRightX = this.innerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 11]
    })

    const outerLeftX = this.outerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -14]
    })

    const outerRightX = this.outerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 16]
    })

    const scale = this.pressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2]
    })

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} onPressIn={this.onPressInHandler} onPressOut={this.onPressOutHandler}>
        <View style={styles.outerContainer}>
          <Animated.View style={[styles.innerContainer, {
            transform: [{scale}]
          }]}>

            <Animated.View style={[styles.vibrationLine, styles.vibrationLineInner, {
              transform: [{
                translateX: innerLeftX
              }]
            }]} />

            <Animated.View style={[styles.vibrationLine, styles.vibrationLineInner, {
              transform: [{
                translateX: innerRightX
              }]
            }]} />

            <Animated.View style={[styles.vibrationLine, styles.vibrationLineOuter, {
              transform: [{
                translateX: outerLeftX
              }]
            }]} />

            <Animated.View style={[styles.vibrationLine, styles.vibrationLineOuter, {
              transform: [{
                translateX: outerRightX
              }]
            }]} />

            <Animated.View style={styles.phone}>
              <View style={styles.ballContainer}>
                <BreathBall size={6} scale={scale}/>
              </View>
            </Animated.View>

          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const styles = StyleSheet.create({
  outerContainer: {
    height: 50,
    width: 44
  },
  innerContainer: {
    position: 'absolute',
    top: 15,
    left: 16,
    height: 20,
    width: 12,
  },
  phone: {
    position: 'absolute',
    height: 24,
    width: 14,
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "solid",
    borderColor: colors.highlight,
    backgroundColor: 'rgb(245,245,245)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vibrationLine: {
    position: 'absolute',
    backgroundColor: colors.highlight,
    borderRadius: 2,
    width: 2,
    left: 5
  },
  vibrationLineOuter: {
    height: 8,
    top: 7
  },
  vibrationLineInner : {
    height: 12,
    top: 5
  },
  ballContainer: {
    backgroundColor: 'red'
  }
})
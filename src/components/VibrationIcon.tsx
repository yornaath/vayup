
import React from 'react'
import { TouchableWithoutFeedback, Animated, View, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'


export interface Props {
  active: boolean
  onPress: () => void
}

export interface State {
  
}

export default class VibrationIcon extends React.Component<Props, State> {

  innerValue = new Animated.Value(0)
  outerValue = new Animated.Value(0)

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

  render() {

    const innerLeftX = this.innerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8]
    })

    const innerRightX = this.innerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8]
    })

    const outerLeftX = this.outerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12]
    })

    const outerRightX = this.outerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 12]
    })

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>

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
            </Animated.View>

          </View>
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
    height: 20,
    width: 12,
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "solid",
    backgroundColor: 'white'
  },
  vibrationLine: {
    position: 'absolute',
    backgroundColor: 'rgb(40,40,40)',
    width: 2,
    left: 5
  },
  vibrationLineOuter: {
    height: 8,
    top: 6
  },
  vibrationLineInner : {
    height: 12,
    top: 4
  } 
})
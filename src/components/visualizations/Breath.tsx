import React from 'react'
import Promise from 'bluebird'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import isEqual from 'lodash/isEqual'
import { colors } from '../../theme'

interface Props {
  ratio: [number, number];
  style?: Object;
  size: number;
}

interface State {
  breath: Animated.Value
}

export default class Breath extends React.Component<Props, State> {

  animation: Animated.CompositeAnimation
  animationRunning: boolean
  timeout: any

  constructor(props:Props) {
    super(props)
    this.animationRunning = false
    this.state = {
      breath: new Animated.Value(0)
    }
  }

  async componentDidMount() {
    this.startAnimation()
  }
  

  async animateToValue(value: number, duration: number) {
    return new Promise(resolve => {
      this.animation = Animated.timing(this.state.breath, {
        toValue: value,
        useNativeDriver: true,
        duration: duration
      })
      this.animation.start(resolve)
    })
  }

  async stopAnimation() {
    if(this.animation) {
      this.animationRunning = false
      this.animation.stop()
    }
  }

  componentWillReceiveProps(nextProps:Props) {
    if(!isEqual(this.props.ratio, nextProps.ratio)) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.restartAnimation()
      }, 500)
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.state.breath.setValue(0)
    await Promise.delay(200)
    setImmediate(() => this.startAnimation())
  }

  async startAnimation() {

    let animation = async () => {

      if(!this.animationRunning) return

      await this.animateToValue(1, this.props.ratio[0])
      if(!this.animationRunning) return

      await this.animateToValue(0, this.props.ratio[1])
      if(!this.animationRunning) return

      animation()
    }

    this.animationRunning = true

    return animation()
  }


  render() {

    const {size} = this.props

    var scale = this.state.breath.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.restartAnimation.bind(this)}>
        <View style={[styles.ballBorder, {borderRadius: size}]}>
          <Animated.View style={[
            styles.ball,
            {
              width: size,
              height: size,
              borderRadius: size,
              transform: [
                {scale: scale}
              ]
            }
          ]}>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ballBorder: {
    borderWidth: 5,
    borderColor: "black",
  },
  ball: {
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center"
  }
});

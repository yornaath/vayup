import React from 'react'
import { delay } from 'bluebird'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import Color from 'color'
import { colors } from '../../theme'
import { Vizualization } from './types'
import { TRatio, equals as ratioEquals } from '../../lib/Ratio'

interface Props {
  ratio: TRatio;
  style?: Object;
  size: number;
}

interface State {
  breath: Animated.Value
}

export default class Breath extends React.Component<Props, State> implements Vizualization {

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

  componentWillUnmount() {
    this.stopAnimation()
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
    if(!ratioEquals(this.props.ratio, nextProps.ratio)) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.restartAnimation()
      }, 500)
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.state.breath.setValue(0)
    await delay(200)
    setImmediate(() => this.startAnimation())
  }

  async startAnimation() {

    let animation = async () => {

      if(!this.animationRunning) return

      await this.animateToValue(1, this.props.ratio.inhale)
      if(!this.animationRunning) return

      await this.animateToValue(0, this.props.ratio.exhale)
      if(!this.animationRunning) return

      animation()
    }

    this.animationRunning = true

    return animation()
  }


  render() {

    const {size} = this.props
    const lowerScale = 0.45
    const upperScale = 1

    var scale = this.state.breath.interpolate({
      inputRange: [0, 1],
      outputRange: [lowerScale, upperScale],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity 
        style={[styles.container, this.props.style]} 
        onPress={this.restartAnimation.bind(this)}>

          <View 
            style={[styles.ballBorder, {borderRadius: size}]}>

              <Animated.View 
                style={[
                  styles.ball,
                  {
                    width: size,
                    height: size,
                    borderRadius: size,
                    transform: [
                      {scale: scale}
                    ]
                  }
                ]
              } />

              <View 
                style={[
                  styles.innerBall,
                  {
                    width: size,
                    height: size,
                    top: 0,
                    left: 0,
                    borderRadius: size,
                    transform: [
                      {scale: lowerScale}
                    ]
                  }
                ]
              } />
              
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
    borderColor: colors.highlight,
  },
  ball: {
    backgroundColor: colors.active,
    justifyContent: "center",
    alignItems: "center"
  },
  innerBall: {
    position: "absolute",
    backgroundColor: Color(colors.active).darken(0.15).toString(),
    justifyContent: "center",
    alignItems: "center"
  }
});

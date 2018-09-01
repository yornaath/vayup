import React from 'react'
import { delay } from 'bluebird'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import Color from 'color'
import { colors } from '../../theme'
import { Vizualization } from './types'
import { TRatio, equals as ratioEquals } from '../../lib/Ratio'
import BreathBall from './BreathBall'

interface Props {
  ratio: TRatio;
  style?: Object;
  size: number;
}

interface State {
  breath: Animated.ValueXY
}

export default class Breath extends React.Component<Props, State> implements Vizualization {

  animation: Animated.CompositeAnimation
  animationRunning: boolean
  timeout: any

  constructor(props:Props) {
    super(props)
    this.animationRunning = false
    this.state = {
      breath: new Animated.ValueXY({x: 0, y: 0})
    }
  }

  async componentDidMount() {
    this.startAnimation()
  }

  componentWillUnmount() {
    this.stopAnimation()
  }
  
  async animateToValue(value: {x: number: y:number}, duration: number) {
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
    this.state.breath.setValue({x: 0, y: 0})
    await delay(200)
    setImmediate(() => this.startAnimation())
  }

  async startAnimation() {

    let animation = async () => {

      if(!this.animationRunning) return

      await this.animateToValue({x: 0, y: 1}, this.props.ratio.inhale)
      if(!this.animationRunning) return

      await this.animateToValue({x: 0, y: 0}, this.props.ratio.exhale)
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

    var scale = this.state.breath.y.interpolate({
      inputRange: [0, 1],
      outputRange: [lowerScale, upperScale],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity 
        style={[styles.container, this.props.style]} 
        onPress={this.restartAnimation.bind(this)}>

          <BreathBall size={size} scale={scale}/>

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
    backgroundColor: Color(colors.active).darken(0.2).toString(),
    justifyContent: "center",
    alignItems: "center"
  }
});

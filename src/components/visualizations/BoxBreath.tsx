import React from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native' 
import {colors} from '../../theme'
import Promise from 'bluebird'

interface Props {
  duration: number;
  size: number;
  style?: Object
}

interface State {
  text: string;
  breath: Animated.ValueXY
}

export default class BoxBreath extends React.Component<Props, State> {

  animation: Animated.CompositeAnimation
  animationRunning: boolean
  timeout: any

  constructor(props:Props) {
    super(props)
    this.animationRunning = false
    this.state = {
      text: "",
      breath: new Animated.ValueXY({ x: 0, y: 0 })
    }
  }

  async componentDidMount() {
    this.startAnimation()
  }
  

  async animateToValue(value: {x:number, y: number}) {
    return new Promise(resolve => {
      this.animation = Animated.timing(this.state.breath, {
        toValue: value,
        useNativeDriver: true,
        duration: this.props.duration
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
    if(this.props.duration !== nextProps.duration) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.restartAnimation()
      }, 500)
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.state.breath.setValue({x: 0, y:0})
    await Promise.delay(200)
    setImmediate(() => this.startAnimation())
  }

  async startAnimation() {

    let animation = async () => {

      if(!this.animationRunning) return

      this.setState({text: "Innhale"})
      await this.animateToValue({x: 0, y: 1})
      if(!this.animationRunning) return

      this.setState({text: "Hold"})
      await this.animateToValue({x: 1, y: 1})
      if(!this.animationRunning) return

      this.setState({text: "Exhale"})
      await this.animateToValue({x: 1, y: 0})
      if(!this.animationRunning) return

      this.setState({text: "Hold"})
      await this.animateToValue({x: 0, y: 0})
      if(!this.animationRunning) return

      animation()
    }

    this.animationRunning = true

    return animation()
  }


  render() {

    var x = this.state.breath.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.size - borderWidth],
      extrapolate: 'clamp'
    })

    var y = this.state.breath.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - borderWidth)],
      extrapolate: 'clamp'
    })

    var scale = this.state.breath.y.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2.2],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity style={[styles.box, {height: this.props.size, width: this.props.size}]} onPress={this.restartAnimation.bind(this)}>
          <Animated.View style={[
            styles.ball,
            {
              transform: [
                {translateX: x},
                {translateY: y},
                {scale: scale}
              ]
            }
          ]}></Animated.View>
          <Text style={styles.text}>
            {this.state.text}
          </Text>
      </TouchableOpacity>
    );
  }
}

const borderWidth = 4
const ballSize = 20
const ballOffset = (borderWidth / 2) + (ballSize / 2)

const styles = StyleSheet.create({
  box: {
    borderWidth: borderWidth,
    borderColor: "rgb(50,50,50)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  ball: {
    width: ballSize,
    height: ballSize,
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    position: "absolute",
    bottom: -ballOffset,
    left: -ballOffset,
    borderRadius: ballSize
  },
  text: {
    fontSize: 25,
    fontWeight: "normal",
    color: colors.blue
  }
});

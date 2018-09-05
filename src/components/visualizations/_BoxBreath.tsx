import React from 'react'
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native' 
import { delay } from 'bluebird'
import { Vizualization } from './types'
import { colors } from '../../theme'
import { TRatio, equals as ratioEquals } from '../../lib/Ratio'
import BreathBall from './BreathBall'

interface Props {
  ratio: TRatio;
  size: number;
  style?: Object
}

interface State {
  text: string;
  breath: Animated.ValueXY
}

export default class BoxBreath extends React.Component<Props, State> implements Vizualization {

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

  componentWillUnmount() {
    this.stopAnimation()
  }
  
  async animateToValue(value: {x:number, y: number}, duration:number) {
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
    this.state.breath.setValue({x: 0, y:0})
    await delay(200)
    setImmediate(() => this.startAnimation())
  }

  async startAnimation() {

    let animation = async () => {

      if(!this.animationRunning) return

      this.setState({text: "innhale"})
      await this.animateToValue({x: 0, y: 1}, this.props.ratio.inhale)
      if(!this.animationRunning) return

      this.setState({text: "hold"})
      await this.animateToValue({x: 1, y: 1}, this.props.ratio.inHold)
      if(!this.animationRunning) return

      this.setState({text: "exhale"})
      await this.animateToValue({x: 1, y: 0}, this.props.ratio.exhale)
      if(!this.animationRunning) return

      this.setState({text: "hold"})
      await this.animateToValue({x: 0, y: 0}, this.props.ratio.outHold)
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
    
    return (
      <TouchableOpacity style={[styles.box, {height: this.props.size, width: this.props.size}]} onPress={this.restartAnimation.bind(this)}>
          <BreathBall x={x} y={y} scale={this.state.breath.y} size={45} offset={borderWidth}/>
          <Text style={styles.text}>
            {this.state.text}
          </Text>
      </TouchableOpacity>
    );
  }
}



const borderWidth = 5

const styles = StyleSheet.create({
  box: {
    borderWidth: borderWidth,
    borderColor: colors.highlight,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: "normal",
    color: colors.active,
    fontFamily: 'main-regular',
  }
});

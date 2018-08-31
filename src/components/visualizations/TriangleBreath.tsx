import React from 'react'
import {Svg} from 'expo'
import { delay } from 'bluebird'
import { StyleSheet, View, Animated, Text, TouchableOpacity } from 'react-native'
import { Vizualization } from './types'
import { colors } from '../../theme'
import { TRatio, equals as ratioEquals } from '../../lib/Ratio'
import BreathBall from './BreathBall'

interface Props {
  ratio: TRatio;
  style?: Object;
  size: number;
}

interface State {
  text: string;
  ballLocation: Animated.ValueXY;
}

export default class TriangleBreath extends React.Component<Props, State> implements Vizualization {

  animation: Animated.CompositeAnimation
  animationRunning: boolean
  timeout: any

  constructor(props:Props) {
    super(props)
    this.state = {
      text: "",
      ballLocation: new Animated.ValueXY({ x: 0.5, y: 0 })
    }
  }

  async componentDidMount() {
    this.startAnimation()
  }

  componentWillReceiveProps(nextProps:Props) {
    if(!ratioEquals(this.props.ratio, nextProps.ratio)) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.restartAnimation()
      }, 500)
    }
  }

  async animateToValue(value: {x: number, y:number}, duration: number) {
    return new Promise(resolve => {
      this.animation = Animated.timing(this.state.ballLocation, {
        toValue: value,
        useNativeDriver: true,
        duration: duration
      })
      this.animation.start(resolve)
    })
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
      await this.animateToValue({x: 0.5, y: 0}, this.props.ratio.exhale)
      if(!this.animationRunning) return


      animation()
    }

    this.animationRunning = true

    return animation()
  }

  async stopAnimation() {
    this.animationRunning = false
    if(this.animation) {
      this.animation.stop()
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.state.ballLocation.setValue({ x: 0.5, y: 0 })
    await delay(200)
    setImmediate(() => this.startAnimation())
  }

  render() {

    const {size} = this.props

    var x = this.state.ballLocation.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.size - strokeWidth],
      extrapolate: 'clamp'
    })

    var y = this.state.ballLocation.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - strokeWidth)],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity onPress={this.restartAnimation.bind(this)}>
        <View style={[styles.container, this.props.style]}>

          <View style={styles.triangleContainer}>
            <Svg height={size} width={size}>
              <Svg.Path 
                strokeLineJoin="round" 
                stroke={colors.highlight} 
                strokeWidth={strokeWidth} 
                fill={"transparent"} 
                d={`M ${size/2},${strokeWidth} ${size - (strokeWidth / 2)},${size- (strokeWidth/2)} ${strokeWidth},${size- (strokeWidth/2)} z`}/>
            </Svg>
          </View>

          <Text style={[styles.text, {width: size, top: (size / 2) - 60}]}>
            {this.state.text}
          </Text>

          <BreathBall x={x} y={y} scale={this.state.ballLocation.y} size={45} offset={-5}/>

        </View>
      </TouchableOpacity>
    )
  }
}

const ballSize = 20
const strokeWidth = 5
const ballOffset =  (ballSize / 2)

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  ballBorder: {
    borderWidth: 5,
    borderColor: "black",
    borderRadius: ballSize
  },
  ball: {
    width: ballSize,
    height: ballSize,
    backgroundColor: colors.active,
    shadowColor: colors.active,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    position: "absolute",
    bottom: -(ballOffset - (strokeWidth / 2)),
    left: -(ballOffset - (strokeWidth / 2)),
    borderRadius: ballSize
  },
  triangleContainer: {
    transform: [
      {rotateZ: "180deg"}
    ],
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: "normal",
    color: colors.active,
    position: 'absolute',
    left: 0,
    textAlign: 'center',
    fontFamily: 'comfortaa-regular',
  }
});

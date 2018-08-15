import React from 'react'
import {Svg} from 'expo'
import { StyleSheet, View, Animated } from 'react-native'
import * as Pranayama from '../../lib/Pranayama'

interface Props {
  ratio: [number, number, number];
  duration: number;
  style?: Object;
  size: number;
}

interface State {
  
}

export default class Breath extends React.Component<Props, State> {

  guide: Pranayama.Guide

  constructor(props:Props) {
    super(props)
    this.state = {
      text: "",
      ballLocation: new Animated.ValueXY({ x: 0, y: 0 }),
      ballScale: new Animated.Value(0)
    }
    const boxBreath = Pranayama.BoxBreath([1,1,1,0], 10 * 1000, Infinity)
    this.guide = Pranayama.guide(boxBreath)
    this.guide.instructions.on("step", (step) => {
      this.setState({ text: step.instruction })
    })
  }

  async componentDidMount() {
    try {
      await this.guide.start()
    }
    catch(err) {
      console.log(err)
    }
  }


  render() {

    const {size} = this.props

    var x = this.guide.value.x.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.size - strokeWidth, (this.props.size - strokeWidth) / 2, 0],
      extrapolate: 'clamp'
    })

    var y = this.guide.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - strokeWidth)],
      extrapolate: 'clamp'
    })

    var scale = this.guide.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.triangleContainer}>
          <Svg height={size} width={size}>
            <Svg.Path strokeLineJoin="round" stroke="black" strokeWidth={strokeWidth} fill={"transparent"} d={`M ${size/2},${strokeWidth} ${size - (strokeWidth / 2)},${size- (strokeWidth/2)} ${strokeWidth},${size- (strokeWidth/2)} z`}/>
          </Svg>
        </View>
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
      </View>
    );
  }
}

const ballSize = 20
const strokeWidth = 5
const ballOffset =  (ballSize / 2)

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  ballBorder: {
    borderWidth: 5,
    borderColor: "black",
    borderRadius: ballSize
  },
  ball: {
    width: ballSize,
    height: ballSize,
    backgroundColor: "rgba(0,0,0, 0.9)",
    position: "absolute",
    bottom: -ballOffset,
    left: -ballOffset,
    borderRadius: ballSize
  },
  triangleContainer {
    transform: [
      {rotateZ: "180deg"}
    ]
  }
});

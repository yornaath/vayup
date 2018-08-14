import React from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import * as Pranayama from '../../lib/Pranayama'
import { inflateSync } from 'zlib';

interface Props {
  ratio: [number, number, number, number];
  duration: number;
  size: number;
  style?: Object
}

interface State {
  text: string;
  ballLocation: Animated.ValueXY;
  ballScale: Animated.Value
}

export default class BoxBreath extends React.Component<Props, State> {

  guide: Pranayama.Guide

  constructor(props:Props) {
    super(props)
    this.state = {
      text: "",
      ballLocation: new Animated.ValueXY({ x: 0, y: 0 }),
      ballScale: new Animated.Value(0)
    }
    const boxBreath = Pranayama.BoxBreath(this.props.ratio, this.props.duration, Infinity)
    this.guide = Pranayama.guide(boxBreath)
    this.guide.instructions.on("step", (step) => {
      this.setState({ text: step.instruction })
    })
  }

  componentDidMount() {
    this.guide.start()
  }


  render() {

    var x = this.guide.value.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.size - borderWidth],
      extrapolate: 'clamp'
    })

    var y = this.guide.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - borderWidth)],
      extrapolate: 'clamp'
    })

    var scale = this.guide.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.box, this.props.style]}>
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
      </View>
    );
  }
}

const borderWidth = 5
const ballSize = 20
const ballOffset = (borderWidth / 2) + (ballSize / 2)

const styles = StyleSheet.create({
  box: {
    borderWidth: borderWidth,
    borderColor: "rgba(0,0,0,1)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
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
  text: {
    fontSize: 20
  }
});

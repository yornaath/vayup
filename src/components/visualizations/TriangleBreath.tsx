import React from 'react'
import {Svg, Path} from 'react-native-svg'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Vizualization, { Step } from './Vizualisation'
import get from 'lodash/get'
import { colors } from '../../theme'
import BreathBall from './BreathBall'
import * as Ratio from '../../lib/Ratio'

interface Props {
  style?: Object;
  size: number;
}

interface State {}

export default class TriangleBreath extends Vizualization<Props, State> {

  getInitialValue() {
    return {x: 0.5, y: 0}
  }

  stepsFromRatio(ratio:Ratio.TRatio) {
    return Ratio.mapToArray<Step>((duration, breath) => ({
      duration,
      breath,
      instruction: {
        text: 
          breath == "inhale" ?  "inhale" :
          breath == "inHold" ?  "hold" :
          breath == "exhale" ?  "exhale" :
          breath == "outHold" ? "hold" :
            null
      },
      value: 
        breath == "inhale" ?  {x: 0, y: 1} :
        breath == "inHold" ?  {x: 1, y: 1} :
        breath == "exhale" ?  {x: 0.5, y: 0} :
        breath == "outHold" ? {x: 0.5, y: 0} :
          null
    }), ratio)
  }

  render() {

    const { size } = this.props

    var x = this.value.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.size - strokeWidth],
      extrapolate: 'clamp'
    })

    var y = this.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - strokeWidth)],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity onPress={this.restartAnimation.bind(this)}>
        <View style={[styles.container, this.props.style]}>

          <View style={styles.triangleContainer}>
            <Svg height={size} width={size}>
              <Path 
                strokeLinejoin="round" 
                stroke={colors.highlight} 
                strokeWidth={strokeWidth} 
                fill={"transparent"} 
                d={`M ${size/2},${strokeWidth} ${size - (strokeWidth / 2)},${size- (strokeWidth/2)} ${strokeWidth},${size- (strokeWidth/2)} z`}/>
            </Svg>
          </View>

          <Text style={[styles.text, {width: size, top: (size / 2) - 60}]}>
            {get(this.state, 'instruction.text')}
          </Text>

          <BreathBall x={x} y={y} scale={this.value.y} size={45} offset={-5}/>

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
    fontFamily: 'main-regular',
  }
});

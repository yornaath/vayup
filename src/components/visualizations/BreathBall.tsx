
import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Color from 'color'
import { colors } from '../../theme'

export default (props:{ size:number, x?:Animated.AnimatedInterpolation, y?: Animated.AnimatedInterpolation, scale: Animated.AnimatedInterpolation, offset?:number }) => {

  const width = props.size
  const height = props.size
  const ballOffset = ((props.offset || 0) / 2) + (props.size / 2)
  const bottom = -ballOffset
  const left = -ballOffset
  const borderRadius = props.size

  const innerScale = props.scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.45],
    extrapolate: 'clamp'
  })

  const outerScale = props.scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
    extrapolate: 'clamp'
  })

  return (
    <React.Fragment>
      <Animated.View style={[
        styles.ball,
        { width, height, bottom, left, borderRadius },
        {
          transform: [
            {translateX: props.x || 0},
            {translateY: props.y || 0},
            {scale: outerScale}
          ]
        }
      ]}></Animated.View>
      <Animated.View style={[
        styles.ball,
        styles.innerBall,
        { width, height, bottom, left, borderRadius },
        {
          transform: [
            {translateX: props.x || 0},
            {translateY: props.y || 0},
            {scale: innerScale}
          ]
        }
      ]}></Animated.View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  ball: {
    backgroundColor: colors.active,
    shadowColor: colors.active,
    position: "absolute",
  },
  innerBall: {
    backgroundColor: Color(colors.active).darken(0.2).toString(),
  },
  text: {
    fontSize: 25,
    fontWeight: "normal",
    color: colors.active
  }
});

console.log(Color(colors.active).darken(0.2).hex() ,colors.active)
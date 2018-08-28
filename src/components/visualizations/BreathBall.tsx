
import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Color from 'color'
import { colors } from '../../theme'

export default (props:{ size:number, x:Animated.AnimatedInterpolation, y: Animated.AnimatedInterpolation, scale: Animated.AnimatedInterpolation, offset:number }) => {

  const width = props.size
  const height = props.size
  const ballOffset = (props.offset / 2) + (props.size / 2)
  const bottom = -ballOffset
  const left = -ballOffset
  const borderRadius = props.size

  const innerScale = props.scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
    extrapolate: 'clamp'
  })

  const outerScale = props.scale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
    extrapolate: 'clamp'
  })

  return (
    <React.Fragment>
      <Animated.View style={[
        styles.ball,
        { width, height, bottom, left, borderRadius },
        {
          transform: [
            {translateX: props.x},
            {translateY: props.y},
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
            {translateX: props.x},
            {translateY: props.y},
            {scale: innerScale}
          ]
        }
      ]}></Animated.View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  ball: {
    backgroundColor: "white",
    shadowColor: colors.active,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    position: "absolute",
  },
  innerBall: {
    backgroundColor: Color(colors.active).darken(0).toString(),
  },
  text: {
    fontSize: 25,
    fontWeight: "normal",
    color: colors.active
  }
});
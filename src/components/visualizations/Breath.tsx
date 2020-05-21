import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Color from 'color'
import { colors } from '../../theme'
import Vizualization from './Vizualisation'
import BreathBall from './BreathBall'

interface Props {
  style?: Object;
  size: number;
}

interface State {}

export default class Breath extends Vizualization<Props, State> {
  render() {

    const { size } = this.props
    const lowerScale = 0.35
    const upperScale = 1

    var scale = this.value.y.interpolate({
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


import React from 'react'
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native' 
import get from 'lodash/get'
import Vizualization from './Vizualisation'
import { colors } from '../../theme'
import BreathBall from './BreathBall'

interface Props {
  size: number;
}

interface State {
  text: string;
  breath: Animated.ValueXY
}

export default class BoxBreath extends Vizualization<Props, State> {

  // onStep(step:Step) {
  //   Haptic.impact(Haptic.ImpactStyles.Light)
  // }

  render() {

    var x = this.value.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.size - borderWidth],
      extrapolate: 'clamp'
    })

    var y = this.value.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.props.size - borderWidth)],
      extrapolate: 'clamp'
    })
    
    return (
      <TouchableOpacity style={[styles.box, {height: this.props.size, width: this.props.size}]} onPress={this.restartAnimation.bind(this)}>
          <BreathBall x={x} y={y} scale={this.value.y} size={45} offset={borderWidth}/>
          <Text style={styles.text}>
            {get(this.state, 'instruction.text')}
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

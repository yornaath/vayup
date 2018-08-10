import React from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'


export default class Breath extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {text: ""}
    this.ballScale = new Animated.Value(0)
  }

  runAnimation() {

    const loop = () => {
      Animated.timing(this.ballScale, {
        toValue: 1,
        duration: this.props.duration
      }).start(() => {
        Animated.timing(this.ballScale, {
          toValue: 0,
          duration: this.props.duration
        }).start(loop)
      })
    }

    loop()
  }

  componentDidMount() {
    this.runAnimation()
  }


  render() {

    var scale = this.ballScale.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.container, this.props.style]}>
        <Animated.View style={[
          styles.ball,
          {
            transform: [
              {scale: scale}
            ]
          }
        ]}>
        </Animated.View>
      </View>
    );
  }
}

const ballSize = 100

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  ball: {
    width: ballSize,
    height: ballSize,
    backgroundColor: "rgba(0,0,0, 0.9)",
    position: "absolute",
    borderRadius: ballSize,
    justifyContent: "center",
    alignItems: "center"
  }
});

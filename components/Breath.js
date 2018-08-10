import React from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'


export default class Breath extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {text: ""}
    this.ballScale = new Animated.Value(0)
  }

  runAnimation() {

    const [inn, out ] = this.props.ratio
    const durationPerUnit = this.props.duration / (inn + out)

    const loop = () => {
      Animated.timing(this.ballScale, {
        toValue: 1,
        duration: inn * durationPerUnit
      }).start(() => {
        Animated.timing(this.ballScale, {
          toValue: 0,
          duration: out * durationPerUnit
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
      outputRange: [0.5, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.ballBorder}>
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
      </View>
    );
  }
}

const ballSize = 200

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: ballSize,
    justifyContent: "center",
    alignItems: "center"
  }
});

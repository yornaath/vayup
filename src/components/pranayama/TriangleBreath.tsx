import React from 'react'
import {Svg} from 'expo'
import { StyleSheet, View } from 'react-native'

interface Props {
  ratio: [number, number, number];
  duration: number;
  style?: Object;
  size: number;
}

interface State {
  
}

export default class Breath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      
    }
  }

  runAnimation() {

    // const [inn, out] = this.props.ratio
    // const durationPerUnit = this.props.duration / (inn + out)

    // const loop = () => {
    //   Animated.timing(this.state.ballScale, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //     duration: inn * durationPerUnit
    //   }).start(() => {
    //     Animated.timing(this.state.ballScale, {
    //       toValue: 0,
    //       useNativeDriver: true,
    //       duration: out * durationPerUnit
    //     }).start(loop)
    //   })
    // }

    // loop()
  }

  componentDidMount() {
    this.runAnimation()
  }


  render() {

    const {size} = this.props

    // var scale = this.state.ballScale.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0.5, 1],
    //   extrapolate: 'clamp'
    // })


    return (
      <View style={[styles.container, this.props.style]}>
        <Svg height={size} width={size}>
          <Svg.Polygon stroke="black" fill="transparent" strokeWidth={strokeWidth} points={`${size/2 + (strokeWidth / 2)}, ${0 + (strokeWidth)} ${0 + strokeWidth}, ${size - (strokeWidth / 2)} ${size - (strokeWidth / 2)}, ${size - (strokeWidth / 2)}`}/>
        </Svg>
      </View>
    );
  }
}

const ballSize = 200
const strokeWidth = 5

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

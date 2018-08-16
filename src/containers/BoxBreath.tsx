import React from 'react'
import { StyleSheet, Text, View, Dimensions, Slider } from 'react-native' 
import BoxBreathVisualization from '../components/visualizations/BoxBreath'
import {spacing} from '../theme'


interface Props {
  
}

interface State {
  duration: number
}

const { width } = Dimensions.get("window")

export default class BoxBreath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      duration: 4
    }
  }

  onDurationSliderChange = (duration:number) => {
    this.setState({ duration: Math.floor(duration) })
  }

  render() {
    return (
      <View style={[styles.container]}>
        
        <View style={styles.visualizationContainer}>
          <BoxBreathVisualization size={(width / 100) * 70} duration={this.state.duration * 1000} />
        </View>
        
        <View style={styles.sliderContainer}>
          <Slider minimumValue={1} maximumValue={30} value={this.state.duration} style={styles.slider} onValueChange={this.onDurationSliderChange}/>
          <Text style={styles.durationText}>
            {this.state.duration} seconds
          </Text>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  visualizationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  slider: {
    width: width - (spacing.four * 2)
  },
  durationText: {
    color: "blue"
  }
});

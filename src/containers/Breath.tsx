import React from 'react'
import { StyleSheet, Text, View, Dimensions, Picker } from 'react-native'
import range from 'lodash/range'
import BreathVisualization from '../components/visualizations/Breath'
import BreathHeader from '../components/BreathHeader'
import RatioPicker from '../components/RatioPicker'
import { spacing, colors, heading} from '../theme'


interface Props {
  
}

interface State {
  duration: number
}

const { width } = Dimensions.get("window")

export default class Breath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      duration: 4
    }
  }

  onSecondsChange = (duration:number) => {
    this.setState({ duration: Math.floor(duration) })
  }

  render() {

    const duration = this.state.duration * 1000

    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="Just Breathe"
          subTitle="Relieve stress or anxiety by training your breath to the vizualisation."
        />

        <View style={styles.visualizationContainer}>
          <BreathVisualization ratio={[duration, duration]} size={((width - (spacing.four * 2)) / 100) * 100}/>
        </View>
        
        <RatioPicker style={styles.ratioPicker}/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  visualizationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  ratioPicker: {
    flex: 1
  }
});

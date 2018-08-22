import React from 'react'
import { StyleSheet, Text, View, Dimensions, Picker } from 'react-native'
import range from 'lodash/range'
import BreathVisualization from '../components/visualizations/Breath'
import BreathHeader from '../components/BreathHeader'
import RatioPicker, {Value as RatioValue} from '../components/RatioPicker'
import { spacing, colors, heading} from '../theme'


interface Props {
  
}

interface State {
  ratio: RatioValue
}

const { width } = Dimensions.get("window")

export default class Breath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      ratio: {
        innhale: 4,
        exhale: 4
      }
    }
  }

  onRatioChange = (ratio:RatioValue) => {
    this.setState({ ratio: ratio })
  }

  render() {

    const {ratio} = this.state
    console.log(ratio)
    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="Just Breathe"
          subTitle="Relieve stress or anxiety by training your breath to the vizualisation."
        />

        <View style={styles.visualizationContainer}>
          <BreathVisualization ratio={[ratio["innhale"] * 1000, ratio["exhale"] * 1000]} size={((width - (spacing.four * 2)) / 100) * 100}/>
        </View>
        
        <RatioPicker 
          style={styles.ratioPicker} 
          ratios={{
            innhale: { label: "innhale", default: 4 },
            exhale: { label: "exhale", default: 4 }
          }}
          onChange={this.onRatioChange}
        />

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

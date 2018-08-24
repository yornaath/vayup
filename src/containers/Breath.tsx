import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import BreathVisualization from '../components/visualizations/Breath'
import BreathHeader from '../components/BreathHeader'
import RatioPicker from '../components/RatioPicker'
import { spacing } from '../theme'
import { Ratio, ratioToMs } from '../lib/Ratio'


interface Props {
  
}

interface State {
  ratio: Ratio
}

const { width } = Dimensions.get("window")

export default class Breath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      ratio: {
        inhale: 4,
        exhale: 4
      }
    }
  }

  onRatioChange = (ratio:Ratio) => {
    this.setState({ ratio: ratio })
  }

  render() {

    const {ratio} = this.state
    
    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="Just Breathe"
          subTitle="Relieve stress or anxiety by training your breath to the vizualisation."
        />

        <View style={styles.visualizationContainer}>
          <BreathVisualization 
            ratio={ratioToMs(ratio)} 
            size={((width - (spacing.four * 2)) / 100) * 100}/>
        </View>
        
        <RatioPicker 
          style={styles.ratioPicker}
          value={ratio}
          showValues={["inhale", "exhale"]}
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

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import RatioPicker from '../components/RatioPicker'
import BreathHeader from '../components/BreathHeader'
import TriangleBreathVisualization from '../components/visualizations/TriangleBreath'
import { spacing } from '../theme'
import { TRatio, Ratio, ratioToMs, } from '../lib/Ratio'


interface Props {
  
}

interface State {
  ratio: TRatio
}

const { width } = Dimensions.get("window")

export default class TriangleBreath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      ratio: Ratio(4, 2, 5, 0)
    }
  }

  onRatioChange = (ratio:TRatio) => {
    this.setState({ ratio: ratio })
  }

  render() {
    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="O2 Breath"
          subTitle="Emphazise the removal of c02 and reoxygenation of the blood."
        />

        <View style={styles.visualizationContainer}>
          <TriangleBreathVisualization size={((width - (spacing.four * 2)) / 100) * 100} ratio={ratioToMs(this.state.ratio)} />
        </View>
        
        <RatioPicker 
          style={styles.ratioPicker}
          value={this.state.ratio}
          showValues={["inhale", "inHold", "exhale", "outHold"]}
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
    alignItems: "center"
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

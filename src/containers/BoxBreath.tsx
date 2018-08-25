import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import BreathHeader from '../components/BreathHeader'
import RatioPicker from '../components/RatioPicker'
import BoxBreathVisualization from '../components/visualizations/BoxBreath'
import { spacing } from '../theme'
import { Ratio, ratioToMs, BoxRatio } from '../lib/Ratio'


interface Props {
  
}

interface State {
  ratio: Ratio
}

const { width } = Dimensions.get("window")

export default class BoxBreath extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props)
    this.state = {
      ratio: BoxRatio(4)
    }
  }

  onRatioChange = (ratio:Ratio) => {
    this.setState({ ratio: ratio })
  }

  render() {
    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="Box Breath"
          subTitle="Regulate, vitalize and calm the autonomic nervous system."
        />

        <View style={styles.visualizationContainer}>
          <BoxBreathVisualization size={((width - (spacing.four * 2)) / 100) * 100} ratio={ratioToMs(this.state.ratio)} />
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

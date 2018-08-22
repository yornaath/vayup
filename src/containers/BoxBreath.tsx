import React from 'react'
import { StyleSheet, Text, View, Dimensions, Picker } from 'react-native'
import range from 'lodash/range'
import BreathHeader from '../components/BreathHeader'
import BoxBreathVisualization from '../components/visualizations/BoxBreath'
import { spacing, colors} from '../theme'


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

  onSecondsChange = (duration:number) => {
    this.setState({ duration: Math.floor(duration) })
  }

  render() {
    return (
      <View style={[styles.container]}>
        
        <BreathHeader 
          title="Box Breath"
          subTitle="An exploration of the corners of the breath that regulates the autonimic nervous system."
        />

        <View style={styles.visualizationContainer}>
          <BoxBreathVisualization size={((width - (spacing.four * 2)) / 100) * 100} duration={this.state.duration * 1000} />
        </View>
        
        <View style={styles.secondsChooserContainer}>
          <View style={styles.pickerContainer}>
            <Picker style={styles.secondsPicker} itemStyle={styles.secondsPickerItem} selectedValue={this.state.duration} onValueChange={this.onSecondsChange}>
              {
                range(1,60).map((num) => 
                  <Picker.Item key={num} label={num.toString()} value={num}/>)
              }
            </Picker>
          </View>
          <Text style={styles.durationText}>
            seconds
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
    alignItems: "flex-start"
  },
  secondsChooserContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  secondsPicker: {
    width: 800,
    height: 50,
    marginBottom: spacing.two,
    overflow: "hidden",
    justifyContent:'center',
  },
  secondsPickerItem: {
    fontSize: 40,
    color: colors.blue
  },
  durationText: {
    flex: 1,
    color: colors.blue
  }
});

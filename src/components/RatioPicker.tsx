import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native'
import range from 'lodash/range'
import { spacing, colors, heading} from '../theme'


interface Props {
  style: Object
}

interface State {
  
}

export default class RatioPicker extends React.Component<Props, State> {

  

  render() {

    const {style} = this.props

    return (
      <View style={[styles.container, style]}>
        <View style={styles.ratioContainer}>
          <View style={styles.pickerContainer}>
            <Picker style={styles.secondsPicker} itemStyle={styles.secondsPickerItem} selectedValue={4}>
              {
                range(1,60).map((num) => 
                  <Picker.Item key={num} label={num.toString()} value={num}/>)
              }
            </Picker>
          </View>
          <Text style={styles.labelText}>
            inhale
          </Text>
        </View>
        <View style={styles.ratioContainer}>
          <View style={styles.pickerContainer}>
            <Picker style={styles.secondsPicker} itemStyle={styles.secondsPickerItem} selectedValue={4}>
              {
                range(1,60).map((num) => 
                  <Picker.Item key={num} label={num.toString()} value={num}/>)
              }
            </Picker>
          </View>
          <Text style={styles.labelText}>
            exhale
          </Text>
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  ratioContainer: {
    width: 80,
    
  },
  secondsChooserContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 2,
    justifyContent: "center",
  },
  secondsPicker: {
    width: 80,
    height: 50,
    marginBottom: spacing.two,
    overflow: "hidden",
    justifyContent:'center',
  },
  secondsPickerItem: {
    fontSize: 40,
    color: colors.blue,
  },
  labelText: {
    flex: 1,
    textAlign: "center",
    color: colors.blue
  }
});


import React from 'react'
import { View, StyleSheet, Picker } from 'react-native'
import range from 'lodash/range'
import { TTime } from '../lib/Time'

export interface Props {
  value:TTime
}

export interface State {

}

export default class TimePicker extends React.Component<Props, State> {

  render() {

    const { value } = this.props

    return (
      <View style={styles.container}>
        <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle} selectedValue={value.hour}>
          {
            range(1, 12).map(hour => (
              <Picker.Item key={hour} value={hour} label={hour.toString()}/>
            ))
          }
        </Picker>
        <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle} selectedValue={value.minute}>
          {
            range(0, 59).map(minute => (
              <Picker.Item key={minute} value={minute} label={minute.toString()}/>
            ))
          }
        </Picker>
        <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle} selectedValue={value.period}>
          <Picker.Item value={"am"} label={"AM"}/>
          <Picker.Item value={"pm"} label={"PM"}/>
        </Picker>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  pickerStyle: {
    flex: 1,
    height: 50,
    overflow: "hidden",
    backgroundColor: "red",
  },
  itemStyle: {
    color: "white",
    fontSize: 14,
  }
})
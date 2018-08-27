import React from 'react'
import { Asset } from 'expo'
import moment, { Moment } from 'moment'
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { spacing } from '../theme'
import { RootState } from '../redux/root-reducer'
import * as settings from '../redux/settings'



type DProps = {
  addReminder: (time: Moment) => void
  removeAtIndex: (index:number) => void
}

type SProps = {
  settings: settings.State
}

type IProps = {

}

type Props = IProps & DProps & SProps

interface State {
  addModalOpen: boolean
}

const mapStateToProps = (state:RootState) => ({
  settings: settings.getState(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addReminder: (time: Moment) => dispatch(settings.addReminderTime(time)),
  removeAtIndex: (index: number) => dispatch(settings.removeReminderTimeAtIndex(index))
})


export default connect<SProps, DProps>(mapStateToProps, mapDispatchToProps)(
  class ReminderTimes extends React.Component<Props, State> {

    state = {
      addModalOpen: false
    }

    onLongPress = (index:number) => {
      return () => {
        Alert.alert("Remove reminder", "Areyou sure you want to remove this reminder?", [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this.props.removeAtIndex(index)},
        ])
      }
    }

    render() {

      const { settings } = this.props
      const { addModalOpen } = this.state

      return (
        <View style={styles.reminderTimesContainer}>
          {
            settings.reminderTimes.map((reminderTime, index) => (
              <View style={styles.reminderTime}>
                <TouchableOpacity onLongPress={this.onLongPress(index)}>
                  <Text style={styles.reminderTimeText}>
                    {moment(reminderTime).format("h:mm a")}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          }
          <TouchableOpacity onPress={(() => this.setState({ addModalOpen: true }))}>
            <Image source={Asset.fromModule(require("../../assets/add.png"))} style={styles.addIcon} resizeMode={"contain"}/>
          </TouchableOpacity>

          <DateTimePicker
            mode="time"
            isVisible={addModalOpen}
            is24Hour={false}
            onConfirm={(value) => {
              this.props.addReminder(moment(value))
              this.setState({ addModalOpen: false })
            }}
            onCancel={() => this.setState({addModalOpen: false} )}/>

        </View>
      )
    }

  })



const styles = StyleSheet.create({
  reminderTimesContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    width: 300
  },
  reminderTime: {
    marginLeft: spacing.one,
  },
  reminderTimeText: {
    color: "white"
  },
  addIcon: {
    height: 24,
    width: 24,
    marginLeft: spacing.one
  }
})

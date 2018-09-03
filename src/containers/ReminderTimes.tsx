import React from 'react'
import { Asset } from 'expo'
import moment from 'moment'
import omit from 'lodash/omit'
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { spacing } from '../theme'
import { RootState } from '../redux/root-reducer'
import * as settings from '../redux/settings'



type DProps = {
  addReminder: (time: {hour: number, minute:number}) => void
  removeAtIndex: (index:number) => void
}

type SProps = {
  settings: settings.State
}

type IProps = {

}

type Props = IProps & DProps & SProps

interface State {
  addModalOpen: boolean;
  editModalsOpen: {[key:number]: boolean}
}

const mapStateToProps = (state:RootState) => ({
  settings: settings.getState(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addReminder: (time: {hour: number, minute:number}) => dispatch(settings.addReminderTime(time)),
  removeAtIndex: (index: number) => dispatch(settings.removeReminderTimeAtIndex(index))
})


export default connect<SProps, DProps>(mapStateToProps, mapDispatchToProps)(
  class ReminderTimes extends React.Component<Props, State> {

    state:State = {
      addModalOpen: false,
      editModalsOpen: {}
    }

    onLongPressReminder = (index:number) => {
      return () => {
        Alert.alert("Remove reminder", "Areyou sure you want to remove this reminder?", [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this.props.removeAtIndex(index)},
        ])
      }
    }

    onPressReminder = (index:number) => {
      return () => {
        this.openModalForIndex(index)
      }
    }

    openModalForIndex = (index: number) => {
      this.setState({
        editModalsOpen: { ...this.state.editModalsOpen, [index]: true }
      })
    }

    closeModalForIndex = (index: number) => {
      this.setState({
        editModalsOpen: omit(this.state.editModalsOpen, index)
      })
    }

    render() {

      const { settings } = this.props
      const { addModalOpen } = this.state

      return (
        <View style={styles.reminderTimesContainer}>
        
          {
            settings.reminderTimes.map((reminderTime, index) => (
              <View key={index} style={styles.reminderTime}>
                <TouchableOpacity onPress={this.onPressReminder(index)} onLongPress={this.onLongPressReminder(index)}>
                  <Text style={styles.reminderTimeText}>
                    {reminderTime.hour}:{reminderTime.minute < 9 && "0"}{reminderTime.minute}
                  </Text>
                </TouchableOpacity>
                {/* <DateTimePicker
                  date={reminderTime}
                  mode="time"
                  isVisible={editModalsOpen[index]}
                  is24Hour={false}
                  onConfirm={(value) => {
                    this.closeModalForIndex(index)
                  }}
                  onCancel={() => this.closeModalForIndex(index)}/> */}
              </View>
            ))
          }

          <TouchableOpacity onPress={(() => this.setState({ addModalOpen: true }))}>
            <Image source={Asset.fromModule(require("../../assets/add.png"))} style={styles.addIcon} resizeMode={"contain"}/>
          </TouchableOpacity>

          <DateTimePicker
            titleIOS={"Pick a reminder time."}
            mode="time"
            isVisible={addModalOpen}
            is24Hour={false}
            onConfirm={(value) => {
              this.props.addReminder({
                hour: moment(value).get("hour"),
                minute: moment(value).get("minute")
              })
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
    color: "white",
    fontFamily: 'main-regular',
  },
  addIcon: {
    height: 24,
    width: 24,
    marginLeft: spacing.one
  }
})


import { getType } from 'typesafe-actions'
import { Notifications } from 'expo'
import moment from 'moment'
import { takeEvery, call, select, Effect } from 'redux-saga/effects'
import { getState, State } from './reducer'
import * as actions from './actions'

export function* saga():IterableIterator<Effect> {

  yield takeEvery([
    getType(actions.addReminderTime), 
    getType(actions.removeReminderTimeAtIndex)
  ], resetReminders)

  yield takeEvery(getType(actions.setRemindersOn), function* (action: {type: string, payload:boolean}) {
    if(action.payload) {
      yield call(resetReminders)
    }
    else {
      yield call(unscheduleAllReminders)
    }
  })

}

export function* resetReminders () {

  const { remindersOn, reminderTimes }:State = yield select(getState)

  if(!remindersOn) 
    return null

  yield call(unscheduleAllReminders)

  for(let reminderTime of reminderTimes) {

    const reminderDate = moment().set({
      hour: reminderTime.hour,
      minute: reminderTime.minute
    })

    if(reminderDate.isBefore(moment())) {
      reminderDate.add(1, 'day')
    }
    
    console.log(reminderDate)

    yield call(Notifications.scheduleLocalNotificationAsync, {
      title: "Remember to breathe.",
      body: "Take a time out to do your breathing excercises."
    }, {
      time: reminderDate.toDate().getTime(),
      repeat: 'day'
    })
  }
  
}

export function* unscheduleAllReminders() {
  return yield call(Notifications.cancelAllScheduledNotificationsAsync)
}


import { getType } from 'typesafe-actions'
import { Notifications } from 'expo'
import moment from 'moment'
import { takeEvery, put, call, select, Effect } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { getState, State } from './reducer'
import * as actions from './actions'
import { TRatio } from '../../lib/Ratio'

export function* saga():IterableIterator<Effect> {

  yield takeEvery([
    getType(actions.addReminderTime), 
    getType(actions.removeReminderTimeAtIndex)
  ], resetReminders)

  yield takeEvery(getType(actions.setRatioForKey), setRatioHandler)

  yield takeEvery(getType(actions.setRemindersOn), function* (action: {type: string, payload:boolean}) {
    if(action.payload) {
      yield call(resetReminders)
    }
    else {
      yield call(unscheduleAllReminders)
    }
  })

}

export function* setRatioHandler(action: {type: string, payload: {ratio: TRatio}}) {
  const warnTreshold = 10
  const { inHold, outHold } = action.payload.ratio
  const { hasWarnedAboutRetention }:State = yield select(getState)
  if(!hasWarnedAboutRetention && (inHold > warnTreshold || outHold > warnTreshold)) {
    Alert.alert('Retention Warning', 'Longer breath retentions is something that should be worked towards gradually. Please consult your teacher and/or physician if this is recommended for your constitution.')
    yield put(actions.setWarnedAboutRetention(true))
  }
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

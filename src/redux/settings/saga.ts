
import { getType } from 'typesafe-actions'
import { takeEvery, call, select } from 'redux-saga/effects'
import { getState } from './reducer'
import * as actions from './actions'

export function* saga():IterableIterator<any> {
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

function* resetReminders () {
  const { reminderTimes } = yield select(getState)
  console.log("reset notifications for", reminderTimes)
}

function* unscheduleAllReminders() {
  console.log("stop notifications")
}


import { getType } from 'typesafe-actions'
import { takeEvery, select } from 'redux-saga/effects'
import { getState } from './reducer'
import * as actions from './actions'

export function* saga():IterableIterator<any> {
  yield takeEvery([
    getType(actions.addReminderTime), 
    getType(actions.removeReminderTimeAtIndex)
  ], resetReminders)
}

function* resetReminders () {
  const { reminderTimes } = yield select(getState)
  console.log("reset notifications for", reminderTimes)
}

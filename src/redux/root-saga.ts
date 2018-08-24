
import { all } from 'redux-saga/effects'
import * as appstate from './appstate'

export const saga = function* (){
  yield all([
    appstate.saga()
  ])
}
import { ActionType, getType } from 'typesafe-actions'
import moment, { Moment } from 'moment'
import { RootState } from '../root-reducer'
import * as actions from './actions'
import { TRatio, Ratio, BoxRatio } from '../../lib/Ratio'

export interface State {
  remindersOn: boolean;
  reminderTimes: Moment[];
  ratios: {
    [key:string]: TRatio
  }
}



export const initialState:State = {
  remindersOn: true,
  reminderTimes: [
    moment("2013-02-08 12:00")
  ],
  ratios: {
    boxbreath: BoxRatio(4),
    breathe: Ratio(4, 0, 4, 0),
    detoxbreath: Ratio(4, 2, 5, 0)
  }
}

export const key = "settings"

export type SettingsAction = ActionType<typeof actions>;

export const reducer = (state = initialState, action:SettingsAction) => {
  switch(action.type) {

    case getType(actions.setRatioForKey):
      return {
        ...state,
        ratios: {
          ...state.ratios,
          [action.payload.key]: action.payload.ratio
        }
      }
    
    case getType(actions.setRemindersOn):
      return {
        ...state,
        remindersOn: action.payload
      }
    
    case getType(actions.setRemindersOn):
      return {
        ...state,
        reminderTimes: [
          ...state.reminderTimes,
          action.payload
        ]
      }
    
    case getType(actions.addReminderTime):
      return {
        ...state,
        reminderTimes: state.reminderTimes.concat(action.payload)
      }
  
    case getType(actions.removeReminderTimeAtIndex):
      let newReminderTimes = [...state.reminderTimes]
      newReminderTimes.splice(action.payload, 1)
      return {
        ...state,
        reminderTimes: newReminderTimes
      }
      
  }
  return state
}

export const getState = (state:RootState):State => state[key]

export const getRatioForKey = (state:RootState, key:string):TRatio => getState(state).ratios[key]
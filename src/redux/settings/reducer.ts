import { ActionType, getType } from 'typesafe-actions'
import { RootState } from '../root-reducer'
import * as actions from './actions'
import { TRatio, Ratio, BoxRatio } from '../../lib/Ratio'

export interface State {
  remindersOn: boolean;
  ratios: {
    [key:string]: TRatio
  }
}

export const initialState:State = {
  remindersOn: true,
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
      
  }
  return state
}

export const getstate = (state:RootState):State => state[key]

export const getRatioForKey = (state:RootState, key:string):TRatio => getstate(state).ratios[key]
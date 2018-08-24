import { ActionType, getType } from 'typesafe-actions'
import { RootState } from '../root-reducer'
import * as actions from './actions'

export interface State {
  
}

export const initialState:State = {
  
}

export const key = "settings"

export type SettingsAction = ActionType<typeof actions>;

export const reducer = (state = initialState, action:SettingsAction) => {
  switch(action.type) {
    
  }
  return state
}

/*
 * Selectors
*/

export const getstate = (state:RootState):State => state[key]
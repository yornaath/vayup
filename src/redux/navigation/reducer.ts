import { ActionType, getType } from 'typesafe-actions'
import { RootState } from '../root-reducer'
import * as actions from './actions'
import { Location } from './types'

export interface State {
  location: Location
}

export const initialState:State = {
  location: {
    path: "breathe"
  }
}

export const key = "navigation"

export type NavigationAction = ActionType<typeof actions>;

export const reducer = (state = initialState, action:NavigationAction) => {
  switch(action.type) {

    case getType(actions.setLocation):
      return {
        ...state,
        location: action.payload
      }
    
  }
  return state
}

export const getLocation = (state:RootState):Location => state[key].location
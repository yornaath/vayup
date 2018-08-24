import { ActionType, getType } from 'typesafe-actions'
import { RootState } from '../root-reducer'
import * as actions from './actions'

export interface State {
  readonly appstate: string;
  readonly storageHydrated: boolean;
  readonly assetsLoaded: boolean;
}

export const initialState:State = {
  appstate: 'inactive',
  storageHydrated: false,
  assetsLoaded: false
}

export const key = "appstate"

export type AppstateAction = ActionType<typeof actions>;

export const reducer = (state = initialState, action:AppstateAction) => {
  switch(action.type) {
    case getType(actions.setState): 
      return { ...state, 
               appstate: action.payload.nextAppState}
    case getType(actions.setStorageHydrated):
      return { ...state, storageHydrated: action.payload }
    case getType(actions.setAssetsLoaded):
      return { ...state, assetsLoaded: action.payload }
  }
  return state
}

/*
 * Selectors
*/

export const getAppState = (state:RootState):State => state[key]

export const getIsLoaded = (state:RootState) => {
  const { storageHydrated, assetsLoaded } = getAppState(state)
  return storageHydrated && assetsLoaded
}
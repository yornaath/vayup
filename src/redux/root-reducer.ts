
import { persistCombineReducers } from 'redux-persist'
import * as appstate from './appstate'
import * as settings from './settings'
import storage from 'redux-persist/es/storage'


export type RootState = {
  [appstate.key]:appstate.State;
  [settings.key]:settings.State;
}

export const reducer = persistCombineReducers<RootState>({
  key: "storage",
  storage
},{
  [appstate.key]: appstate.reducer,
  [settings.key]: settings.reducer
})

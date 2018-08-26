
import { persistCombineReducers } from 'redux-persist'
import * as appstate from './appstate'
import * as settings from './settings'
import * as navigation from './navigation'
import storage from 'redux-persist/es/storage'


export type RootState = {
  [appstate.key]:appstate.State;
  [settings.key]:settings.State;
  [navigation.key]:navigation.State;
}

export const reducer = persistCombineReducers<RootState>({
  key: "storage",
  storage,
  whitelist: [settings.key, navigation.key]
},{
  [appstate.key]: appstate.reducer,
  [settings.key]: settings.reducer,
  [navigation.key]: navigation.reducer
})



import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import * as appstate from './appstate'
import { reducer } from './root-reducer'


export const configureStore = () => {

  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  const persistor = persistStore(store, {}, async () => {
    store.dispatch(appstate.setStorageHydrated(true))
    sagaMiddleware.run(function* (){
      yield all([
        appstate.saga()
      ])
    })
  })

  return { store, persistor }
}
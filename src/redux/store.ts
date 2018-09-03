

import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import * as appstate from './appstate'
import { reducer } from './root-reducer'
import { saga } from './root-saga'


export const sagaMiddleware = createSagaMiddleware()
  
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

export const persistor = persistStore(store, {}, async () => {
  store.dispatch(appstate.setStorageHydrated(true))
  sagaMiddleware.run(saga)
})

persistor.purge()

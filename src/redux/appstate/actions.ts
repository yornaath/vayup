
import { createAction } from 'typesafe-actions'

export const setState = createAction("@APPSTATE/SET_STATE", resolve => {
  return (state: { prevAppState:string, nextAppState:string }) => resolve(state)
})

export const setStorageHydrated = createAction("@APPSTATE/SET_STORAGE_HYDRATED", resolve => {
  return (hydrated: boolean) => resolve(hydrated)
})


export const setAssetsLoaded = createAction("@APPSTATE/SET_ASSETS_LOADED", resolve => {
  return (loaded: boolean) => resolve(loaded)
})
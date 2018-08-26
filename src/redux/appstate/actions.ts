
import { createAction } from 'typesafe-actions'

export const setState = createAction("@appstate/SET_STATE", resolve => {
  return (state: { prevAppState:string, nextAppState:string }) => resolve(state)
})

export const setStorageHydrated = createAction("@appstate/SET_STORAGE_HYDRATED", resolve => {
  return (hydrated: boolean) => resolve(hydrated)
})


export const setAssetsLoaded = createAction("@appstate/SET_ASSETS_LOADED", resolve => {
  return (loaded: boolean) => resolve(loaded)
})
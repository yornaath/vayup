
import { createAction } from 'typesafe-actions'
import { Location } from './types'

export const setLocation = createAction("@navigation/SET_LOCATION", resolve => {
  return (location: Location) => resolve(location)
})

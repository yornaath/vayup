
import { createAction } from 'typesafe-actions'
import { TRatio } from '../../lib/Ratio'

export const setRatioForKey = createAction("@settings/SET_RATIO_FOR_KEY", resolve => {
  return (key:string, ratio: TRatio) => resolve({key, ratio})
})

export const setRemindersOn = createAction("@settings/SET_REMINDERS_ON", resolve => {
  return (on:boolean) => resolve(on)
})
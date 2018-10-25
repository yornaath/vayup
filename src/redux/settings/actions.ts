
import { createAction } from 'typesafe-actions'
import { TRatio } from '../../lib/Ratio'

export const setRatioForKey = createAction("@settings/SET_RATIO_FOR_KEY", resolve => {
  return (key:string, ratio: TRatio) => resolve({key, ratio})
})

export const setRemindersOn = createAction("@settings/SET_REMINDERS_ON", resolve => {
  return (on:boolean) => resolve(on)
})

export const addReminderTime = createAction("@settings/ADD_REMINDER_TIME", resolve => {
  return (reminder: { hour:number, minute:number }) => resolve(reminder)
})

export const setHaptic = createAction("@settings/SET_HAPTIC", resolve => {
  return (on: boolean) => resolve(on)
})

export const setWarnedAboutRetention = createAction("@settings/SET_WARNED_ABOUT_RETENTION", resolve => {
  return (warned: boolean) => resolve(warned)
})

export const removeReminderTimeAtIndex = createAction("@settings/REMOVE_REMINDER_TIME_AT_INDEX", resolve => {
  return (index:number) => resolve(index)
})
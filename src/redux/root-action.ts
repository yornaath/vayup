import { AppstateAction } from './appstate/reducer'
import { SettingsAction } from './settings/reducer'
import { NavigationAction } from './navigation/reducer'

export type RootAction = AppstateAction
                       | SettingsAction 
                       | NavigationAction
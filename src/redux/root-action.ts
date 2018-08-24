import { AppstateAction } from './appstate/reducer'
import { SettingsAction } from './settings/reducer'

export type RootAction = AppstateAction
                       | SettingsAction 
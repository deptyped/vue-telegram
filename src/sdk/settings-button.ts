import type { EventCallback } from './events'

export type SettingsButton = {
  isVisible: boolean
  onClick: (callback: EventCallback['settingsButtonClicked']) => SettingsButton
  offClick: (callback: EventCallback['settingsButtonClicked']) => SettingsButton
  show: () => SettingsButton
  hide: () => SettingsButton
}

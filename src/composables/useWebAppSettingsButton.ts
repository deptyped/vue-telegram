import { useWebApp } from './useWebApp'
import type { OnSettingsButtonClickedCallback } from '~/types'

export function useWebAppSettingsButton() {
  const { onEvent } = useWebApp()

  const onSettingsButtonClicked = (eventHandler: OnSettingsButtonClickedCallback) =>
    onEvent('settingsButtonClicked', eventHandler)

  return {
    onSettingsButtonClicked,
  }
}

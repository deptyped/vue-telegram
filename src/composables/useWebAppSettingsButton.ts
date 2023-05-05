import { useWebApp } from './useWebApp'

export function useWebAppSettingsButton() {
  const { onEvent } = useWebApp()

  const onSettingsButtonClicked = (eventHandler: () => void) =>
    onEvent('settingsButtonClicked', eventHandler)

  return {
    onSettingsButtonClicked,
  }
}

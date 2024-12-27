import { useSettingsButton } from '../composables/useSettingsButton'
import { onSettingsButtonClicked } from '../events'

/**
 * @deprecated Use [`useSettingsButton`](https://vue-tg.deptyped.com/mini-apps.html#usesettingsbutton) instead
 */
export function useWebAppSettingsButton() {
  const settingsButton = useSettingsButton({ version: '8.0' })

  return {
    isSettingsButtonVisible: settingsButton.isVisible,
    showSettingsButton: settingsButton.show,
    hideSettingsButton: settingsButton.hide,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onSettingsButtonClicked,
  }
}

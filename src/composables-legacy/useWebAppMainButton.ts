import type { WebApp } from '../sdk'
import { useMainButton } from '../composables/useMainButton'
import { onMainButtonClicked } from '../events'

/**
 * @deprecated Use [`useMainButton`](https://vue-tg.deptyped.com/mini-apps.html#usemainbutton) instead
 */
export function useWebAppMainButton() {
  const mainButton = useMainButton({ version: '8.0' })

  return {
    mainButtonText: mainButton.text,
    mainButtonColor: mainButton.color,
    mainButtonTextColor: mainButton.textColor,
    isMainButtonVisible: mainButton.isVisible,
    isMainButtonActive: mainButton.isActive,
    isMainButtonProgressVisible: mainButton.isProgressVisible,
    setMainButtonText(text: Parameters<WebApp['MainButton']['setText']>[0]) {
      mainButton.text.value = text
    },
    showMainButton: mainButton.show,
    hideMainButton: mainButton.hide,
    enableMainButton: mainButton.enable,
    disableMainButton: mainButton.disable,
    showMainButtonProgress: mainButton.showProgress,
    hideMainButtonProgress: mainButton.hideProgress,
    setMainButtonParams: mainButton.setParams,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onMainButtonClicked,
  }
}

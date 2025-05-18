import { useBackButton } from '../composables/useBackButton'
import { onBackButtonClicked } from '../events'

/**
 * @deprecated Use [`useBackButton`](https://vue-tg.deptyped.com/mini-apps.html#usebackbutton) instead
 */
export function useWebAppBackButton() {
  const backButton = useBackButton('8.0')

  return {
    isBackButtonVisible: backButton.isVisible,
    showBackButton: backButton.show,
    hideBackButton: backButton.hide,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onBackButtonClicked,
  }
}

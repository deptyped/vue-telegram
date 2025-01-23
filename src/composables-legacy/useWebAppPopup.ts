import { usePopup } from '../composables/usePopup'
import { onPopupClosed } from '../events'

/**
 * @deprecated Use [`usePopup`](https://vue-tg.deptyped.com/mini-apps.html#usepopup) instead
 */
export function useWebAppPopup() {
  const { showPopup, showAlert, showConfirm } = usePopup({ version: '8.0' })

  return {
    showPopup,
    showAlert,
    showConfirm,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onPopupClosed,
  }
}

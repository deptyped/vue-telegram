import { onPopupClosed } from '../events'

/**
 * @deprecated Use [`usePopup`](https://vue-tg.deptyped.com/mini-apps.html#usepopup) instead
 */
export function useWebAppPopup() {
  const { showPopup, showAlert, showConfirm } = Telegram.WebApp

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

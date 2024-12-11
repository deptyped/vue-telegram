import { onPopupClosed } from '../events'

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

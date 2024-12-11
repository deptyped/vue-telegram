import { onQrTextReceived, onScanQrPopupClosed } from '../events'

/**
 * @deprecated Use [`useQrScanner`](https://vue-tg.deptyped.com/mini-apps.html#useqrscanner) instead
 */
export function useWebAppQrScanner() {
  const { showScanQrPopup, closeScanQrPopup } = Telegram.WebApp

  return {
    showScanQrPopup,
    closeScanQrPopup,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onQrTextReceived,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onScanQrPopupClosed,
  }
}

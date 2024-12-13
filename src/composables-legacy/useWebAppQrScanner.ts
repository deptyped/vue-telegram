import { onQrTextReceived, onScanQrPopupClosed } from '../events'
import { WebApp } from '../sdk'

/**
 * @deprecated Use [`useQrScanner`](https://vue-tg.deptyped.com/mini-apps.html#useqrscanner) instead
 */
export function useWebAppQrScanner() {
  const { showScanQrPopup, closeScanQrPopup } = WebApp

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

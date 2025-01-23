import { useQrScanner } from '../composables/useQrScanner'
import { onQrTextReceived, onScanQrPopupClosed } from '../events'

/**
 * @deprecated Use [`useQrScanner`](https://vue-tg.deptyped.com/mini-apps.html#useqrscanner) instead
 */
export function useWebAppQrScanner() {
  const qrScanner = useQrScanner({ version: '8.0' })

  return {
    showScanQrPopup: qrScanner.show,
    closeScanQrPopup: qrScanner.close,
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

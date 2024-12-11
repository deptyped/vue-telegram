import { onQrTextReceived, onScanQrPopupClosed } from '../events'

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

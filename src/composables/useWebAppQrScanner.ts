import { useWebApp } from './useWebApp'

const {
  showScanQrPopup,
  closeScanQrPopup,
} = Telegram.WebApp

export function useWebAppQrScanner() {
  const { onEvent } = useWebApp()

  const onQrTextReceived = (eventHandler: (eventData: { data: string }) => void) =>
    onEvent('qrTextReceived', eventHandler)

  return {
    showScanQrPopup,
    closeScanQrPopup,
    onQrTextReceived,
  }
}

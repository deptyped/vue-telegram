import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

export function useWebAppQrScanner() {
  const { onEvent } = useWebApp()

  const onQrTextReceived = (
    eventHandler: QrTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent("qrTextReceived", eventHandler, options)

  const onScanQrPopupClosed = (
    eventHandler: ScanQrPopupClosedCallback,
    options?: OnEventOptions,
  ) => onEvent("scanQrPopupClosed", eventHandler, options)

  const { showScanQrPopup, closeScanQrPopup } = Telegram.WebApp

  return {
    showScanQrPopup,
    closeScanQrPopup,
    onQrTextReceived,
    onScanQrPopupClosed,
  }
}

import { useWebApp } from "./useWebApp"
import type { OnQrTextReceivedCallback } from "~/types"

const { showScanQrPopup, closeScanQrPopup } = Telegram.WebApp

export function useWebAppQrScanner() {
  const { onEvent } = useWebApp()

  const onQrTextReceived = (eventHandler: OnQrTextReceivedCallback) =>
    onEvent("qrTextReceived", eventHandler)

  return {
    showScanQrPopup,
    closeScanQrPopup,
    onQrTextReceived,
  }
}

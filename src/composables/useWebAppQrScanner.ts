import { useWebApp } from "./useWebApp"
import type { OnEventOptions, OnQrTextReceivedCallback } from "~/types"

const { showScanQrPopup, closeScanQrPopup } = Telegram.WebApp

export function useWebAppQrScanner() {
  const { onEvent } = useWebApp()

  const onQrTextReceived = (
    eventHandler: OnQrTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent("qrTextReceived", eventHandler, options)

  return {
    showScanQrPopup,
    closeScanQrPopup,
    onQrTextReceived,
  }
}

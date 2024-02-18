import { useWebApp } from "./useWebApp"
import type { OnClipboardTextReceivedCallback } from "~/types"

const { readTextFromClipboard } = Telegram.WebApp

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (
    eventHandler: OnClipboardTextReceivedCallback,
  ) => onEvent("clipboardTextReceived", eventHandler)

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

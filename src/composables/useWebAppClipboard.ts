import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (
    eventHandler: ClipboardTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent("clipboardTextReceived", eventHandler, options)

  const { readTextFromClipboard } = Telegram.WebApp

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

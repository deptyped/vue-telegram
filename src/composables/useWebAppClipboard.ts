import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const { readTextFromClipboard } = Telegram.WebApp

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (
    eventHandler: ClipboardTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent("clipboardTextReceived", eventHandler, options)

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

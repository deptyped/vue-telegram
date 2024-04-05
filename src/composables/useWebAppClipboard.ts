import { useWebApp } from "./useWebApp"
import type { OnClipboardTextReceivedCallback, OnEventOptions } from "~/types"

const { readTextFromClipboard } = Telegram.WebApp

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (
    eventHandler: OnClipboardTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent("clipboardTextReceived", eventHandler, options)

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

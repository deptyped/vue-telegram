import type { OnEventOptions } from '../types'
import { useWebApp } from './useWebApp'

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (
    eventHandler: ClipboardTextReceivedCallback,
    options?: OnEventOptions,
  ) => onEvent('clipboardTextReceived', eventHandler, options)

  const { readTextFromClipboard } = Telegram.WebApp

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

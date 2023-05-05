import { useWebApp } from './useWebApp'

const {
  readTextFromClipboard,
} = Telegram.WebApp

export function useWebAppClipboard() {
  const { onEvent } = useWebApp()

  const onClipboardTextReceived = (eventHandler: (eventData: { data: string | null }) => void) =>
    onEvent('clipboardTextReceived', eventHandler)

  return {
    readTextFromClipboard,
    onClipboardTextReceived,
  }
}

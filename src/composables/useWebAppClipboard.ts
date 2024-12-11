import { onClipboardTextReceived } from '../events'

export function useWebAppClipboard() {
  const { readTextFromClipboard } = Telegram.WebApp

  return {
    readTextFromClipboard,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onClipboardTextReceived,
  }
}

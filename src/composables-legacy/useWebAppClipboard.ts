import { onClipboardTextReceived } from '../events'

/**
 * @deprecated Use [`useClipboard`](https://vue-tg.deptyped.com/mini-apps.html#useclipboard) instead
 */
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

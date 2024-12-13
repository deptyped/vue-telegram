import { onClipboardTextReceived } from '../events'
import { WebApp } from '../sdk'

/**
 * @deprecated Use [`useClipboard`](https://vue-tg.deptyped.com/mini-apps.html#useclipboard) instead
 */
export function useWebAppClipboard() {
  const { readTextFromClipboard } = WebApp

  return {
    readTextFromClipboard,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onClipboardTextReceived,
  }
}

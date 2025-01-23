import { useClipboard } from '../composables/useClipboard'
import { onClipboardTextReceived } from '../events'

/**
 * @deprecated Use [`useClipboard`](https://vue-tg.deptyped.com/mini-apps.html#useclipboard) instead
 */
export function useWebAppClipboard() {
  const { readText } = useClipboard({ version: '8.0' })

  return {
    readTextFromClipboard: readText,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onClipboardTextReceived,
  }
}

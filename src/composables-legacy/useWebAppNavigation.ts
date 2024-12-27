import { useMiniApp } from '../composables/useMiniApp'
import { onInvoiceClosed } from '../events'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppNavigation() {
  const { switchInlineQuery, openLink, openTelegramLink, openInvoice } = useMiniApp({ version: '8.0' })

  return {
    switchInlineQuery,
    openLink,
    openTelegramLink,
    openInvoice,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onInvoiceClosed,
  }
}

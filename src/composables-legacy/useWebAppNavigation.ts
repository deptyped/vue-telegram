import { onInvoiceClosed } from '../events'
import { WebApp } from '../sdk'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppNavigation() {
  const { switchInlineQuery, openLink, openTelegramLink, openInvoice }
    = WebApp

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

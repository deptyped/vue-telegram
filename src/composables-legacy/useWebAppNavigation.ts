import { onInvoiceClosed } from '../events'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppNavigation() {
  const { switchInlineQuery, openLink, openTelegramLink, openInvoice }
    = Telegram.WebApp

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

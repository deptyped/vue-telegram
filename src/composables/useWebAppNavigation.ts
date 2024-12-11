import { onInvoiceClosed } from '../events'

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

import { useWebApp } from './useWebApp'

const {
  switchInlineQuery,
  openLink,
  openTelegramLink,
  openInvoice,
} = Telegram.WebApp

export function useWebAppNavigation() {
  const { onEvent } = useWebApp()

  const onInvoiceClosed = (eventHandler: (
    eventData: {
      url: string
      status: 'paid' | 'cancelled' | 'failed' | 'pending'
    }) => void,
  ) =>
    onEvent('invoiceClosed', eventHandler)

  return {
    switchInlineQuery,
    openLink,
    openTelegramLink,
    openInvoice,
    onInvoiceClosed,
  }
}

import type { OnEventOptions } from '../types'
import { useWebApp } from './useWebApp'

export function useWebAppNavigation() {
  const { onEvent } = useWebApp()

  const onInvoiceClosed = (
    eventHandler: InvoiceClosedCallback,
    options?: OnEventOptions,
  ) => onEvent('invoiceClosed', eventHandler, options)

  const { switchInlineQuery, openLink, openTelegramLink, openInvoice }
    = Telegram.WebApp

  return {
    switchInlineQuery,
    openLink,
    openTelegramLink,
    openInvoice,
    onInvoiceClosed,
  }
}

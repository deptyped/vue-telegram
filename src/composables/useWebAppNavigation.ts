import { useWebApp } from "./useWebApp"
import type { OnInvoiceClosedCallback } from "~/types"

const { switchInlineQuery, openLink, openTelegramLink, openInvoice } =
  Telegram.WebApp

export function useWebAppNavigation() {
  const { onEvent } = useWebApp()

  const onInvoiceClosed = (eventHandler: OnInvoiceClosedCallback) =>
    onEvent("invoiceClosed", eventHandler)

  return {
    switchInlineQuery,
    openLink,
    openTelegramLink,
    openInvoice,
    onInvoiceClosed,
  }
}

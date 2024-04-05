import { useWebApp } from "./useWebApp"
import type { OnEventOptions, OnInvoiceClosedCallback } from "~/types"

const { switchInlineQuery, openLink, openTelegramLink, openInvoice } =
  Telegram.WebApp

export function useWebAppNavigation() {
  const { onEvent } = useWebApp()

  const onInvoiceClosed = (
    eventHandler: OnInvoiceClosedCallback,
    options?: OnEventOptions,
  ) => onEvent("invoiceClosed", eventHandler, options)

  return {
    switchInlineQuery,
    openLink,
    openTelegramLink,
    openInvoice,
    onInvoiceClosed,
  }
}

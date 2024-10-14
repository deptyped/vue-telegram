import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

export function useWebAppRequests() {
  const { onEvent } = useWebApp()

  const onWriteAccessRequested = (
    eventHandler: WriteAccessRequestedCallback,
    options?: OnEventOptions,
  ) => onEvent("writeAccessRequested", eventHandler, options)

  const onContactRequested = (
    eventHandler: ContactRequestedCallback,
    options?: OnEventOptions,
  ) => onEvent("contactRequested", eventHandler, options)

  const { requestContact, requestWriteAccess } = Telegram.WebApp

  return {
    requestContact,
    onContactRequested,
    requestWriteAccess,
    onWriteAccessRequested,
  }
}

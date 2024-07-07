import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const { requestContact, requestWriteAccess } = Telegram.WebApp

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

  return {
    requestContact,
    onContactRequested,
    requestWriteAccess,
    onWriteAccessRequested,
  }
}

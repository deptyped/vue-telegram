import { useWebApp } from "./useWebApp"
import type {
  OnContactRequestedCallback,
  OnEventOptions,
  OnWriteAccessRequestedCallback,
} from "~/types"

const { requestContact, requestWriteAccess } = Telegram.WebApp

export function useWebAppRequests() {
  const { onEvent } = useWebApp()

  const onWriteAccessRequested = (
    eventHandler: OnWriteAccessRequestedCallback,
    options?: OnEventOptions,
  ) => onEvent("writeAccessRequested", eventHandler, options)

  const onContactRequested = (
    eventHandler: OnContactRequestedCallback,
    options?: OnEventOptions,
  ) => onEvent("contactRequested", eventHandler, options)

  return {
    requestContact,
    onContactRequested,
    requestWriteAccess,
    onWriteAccessRequested,
  }
}

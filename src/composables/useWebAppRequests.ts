import { useWebApp } from "./useWebApp"
import type {
  OnContactRequestedCallback,
  OnWriteAccessRequestedCallback,
} from "~/types"

const { requestContact, requestWriteAccess } = Telegram.WebApp

export function useWebAppRequests() {
  const { onEvent } = useWebApp()

  const onWriteAccessRequested = (
    eventHandler: OnWriteAccessRequestedCallback,
  ) => onEvent("writeAccessRequested", eventHandler)

  const onContactRequested = (eventHandler: OnContactRequestedCallback) =>
    onEvent("contactRequested", eventHandler)

  return {
    requestContact,
    onContactRequested,
    requestWriteAccess,
    onWriteAccessRequested,
  }
}

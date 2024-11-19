import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

export function useWebAppPopup() {
  const { onEvent } = useWebApp()

  const onPopupClosed = (
    eventHandler: PopupClosedCallback,
    options?: OnEventOptions,
  ) => onEvent("popupClosed", eventHandler, options)

  const { showPopup, showAlert, showConfirm } = Telegram.WebApp

  return {
    showPopup,
    showAlert,
    showConfirm,
    onPopupClosed,
  }
}

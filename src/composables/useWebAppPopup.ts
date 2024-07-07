import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const { showPopup, showAlert, showConfirm } = Telegram.WebApp

export function useWebAppPopup() {
  const { onEvent } = useWebApp()

  const onPopupClosed = (
    eventHandler: PopupClosedCallback,
    options?: OnEventOptions,
  ) => onEvent("popupClosed", eventHandler, options)

  return {
    showPopup,
    showAlert,
    showConfirm,
    onPopupClosed,
  }
}

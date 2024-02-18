import { useWebApp } from "./useWebApp"
import type { OnPopupClosedCallback } from "~/types"

const { showPopup, showAlert, showConfirm } = Telegram.WebApp

export function useWebAppPopup() {
  const { onEvent } = useWebApp()

  const onPopupClosed = (eventHandler: OnPopupClosedCallback) =>
    onEvent("popupClosed", eventHandler)

  return {
    showPopup,
    showAlert,
    showConfirm,
    onPopupClosed,
  }
}

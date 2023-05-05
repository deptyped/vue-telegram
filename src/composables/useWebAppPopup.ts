import { useWebApp } from './useWebApp'

const {
  showPopup,
  showAlert,
  showConfirm,
} = Telegram.WebApp

export function useWebAppPopup() {
  const { onEvent } = useWebApp()

  const onPopupClosed = (eventHandler: (eventData: { button_id: string | null }) => void) =>
    onEvent('popupClosed', eventHandler)

  return {
    showPopup,
    showAlert,
    showConfirm,
    onPopupClosed,
  }
}

import type { OnEventOptions, OnEventWithOptions } from './types'
import { onMounted, onUnmounted } from 'vue'

export const onEvent: OnEventWithOptions<OnEventOptions> = (
  eventType,
  eventHandler,
  options = { manual: false },
) => {
  const { manual } = options

  const on = () => {
    Telegram.WebApp.onEvent(
      ...([eventType, eventHandler] as Parameters<
        typeof Telegram.WebApp.onEvent
      >),
    )
  }
  const off = () => {
    Telegram.WebApp.offEvent(
      ...([eventType, eventHandler] as Parameters<
        typeof Telegram.WebApp.offEvent
      >),
    )
  }

  if (manual) {
    on()
  }
  else {
    onMounted(on)
    onUnmounted(off)
  }

  return {
    off,
  }
}

export function onThemeChanged(eventHandler: () => void, options?: OnEventOptions) {
  return onEvent('themeChanged', eventHandler, options)
}

export function onViewportChanged(eventHandler: ViewportChangedCallback, options?: OnEventOptions) {
  return onEvent('viewportChanged', eventHandler, options)
}

export function onMainButtonClicked(eventHandler: MainButtonClickedCallback, options?: OnEventOptions) {
  return onEvent('mainButtonClicked', eventHandler, options)
}

export function onBackButtonClicked(eventHandler: BackButtonClickedCallback, options?: OnEventOptions) {
  return onEvent('backButtonClicked', eventHandler, options)
}

export function onSettingsButtonClicked(eventHandler: SettingsButtonClickedCallback, options?: OnEventOptions) {
  return onEvent('settingsButtonClicked', eventHandler, options)
}

export function onInvoiceClosed(eventHandler: InvoiceClosedCallback, options?: OnEventOptions) {
  return onEvent('invoiceClosed', eventHandler, options)
}

export function onPopupClosed(eventHandler: PopupClosedCallback, options?: OnEventOptions) {
  return onEvent('popupClosed', eventHandler, options)
}

export function onQrTextReceived(eventHandler: QrTextReceivedCallback, options?: OnEventOptions) {
  return onEvent('qrTextReceived', eventHandler, options)
}

export function onScanQrPopupClosed(eventHandler: ScanQrPopupClosedCallback, options?: OnEventOptions) {
  return onEvent('scanQrPopupClosed', eventHandler, options)
}

export function onClipboardTextReceived(eventHandler: ClipboardTextReceivedCallback, options?: OnEventOptions) {
  return onEvent('clipboardTextReceived', eventHandler, options)
}

export function onWriteAccessRequested(eventHandler: WriteAccessRequestedCallback, options?: OnEventOptions) {
  return onEvent('writeAccessRequested', eventHandler, options)
}

export function onContactRequested(eventHandler: ContactRequestedCallback, options?: OnEventOptions) {
  return onEvent('contactRequested', eventHandler, options)
}

export function onBiometricManagerUpdated(eventHandler: () => void, options?: OnEventOptions) {
  return onEvent('biometricManagerUpdated', eventHandler, options)
}

export function onBiometricAuthRequested(eventHandler: BiometricAuthRequestedCallback, options?: OnEventOptions) {
  return onEvent('biometricAuthRequested', eventHandler, options)
}

export function onBiometricTokenUpdated(eventHandler: BiometricTokenUpdatedCallback, options?: OnEventOptions) {
  return onEvent('biometricTokenUpdated', eventHandler, options)
}

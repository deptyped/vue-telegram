import type { EventCallback } from './sdk'
import type { OnEventOptions, OnEventWithOptions } from './types'
import { onMounted, onUnmounted } from 'vue'
import { getWebApp } from './sdk'

export const onEvent: OnEventWithOptions<OnEventOptions> = (
  eventType,
  eventHandler,
  options = { manual: false },
) => {
  const { manual } = options
  const webApp = getWebApp()

  const on = () =>
    webApp.onEvent(eventType, eventHandler)
  const off = () =>
    webApp.offEvent(eventType, eventHandler)

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

export function onActivated(eventHandler: EventCallback['activated'], options?: OnEventOptions) {
  return onEvent('activated', eventHandler, options)
}

export function onDeactivated(eventHandler: EventCallback['deactivated'], options?: OnEventOptions) {
  return onEvent('deactivated', eventHandler, options)
}

export function onThemeChanged(eventHandler: EventCallback['themeChanged'], options?: OnEventOptions) {
  return onEvent('themeChanged', eventHandler, options)
}

export function onViewportChanged(eventHandler: EventCallback['viewportChanged'], options?: OnEventOptions) {
  return onEvent('viewportChanged', eventHandler, options)
}

export function onSafeAreaChanged(eventHandler: EventCallback['safeAreaChanged'], options?: OnEventOptions) {
  return onEvent('safeAreaChanged', eventHandler, options)
}

export function onContentSafeAreaChanged(eventHandler: EventCallback['contentSafeAreaChanged'], options?: OnEventOptions) {
  return onEvent('contentSafeAreaChanged', eventHandler, options)
}

export function onMainButtonClicked(eventHandler: EventCallback['mainButtonClicked'], options?: OnEventOptions) {
  return onEvent('mainButtonClicked', eventHandler, options)
}

export function onSecondaryButtonClicked(eventHandler: EventCallback['secondaryButtonClicked'], options?: OnEventOptions) {
  return onEvent('secondaryButtonClicked', eventHandler, options)
}

export function onBackButtonClicked(eventHandler: EventCallback['backButtonClicked'], options?: OnEventOptions) {
  return onEvent('backButtonClicked', eventHandler, options)
}

export function onSettingsButtonClicked(eventHandler: EventCallback['settingsButtonClicked'], options?: OnEventOptions) {
  return onEvent('settingsButtonClicked', eventHandler, options)
}

export function onInvoiceClosed(eventHandler: EventCallback['invoiceClosed'], options?: OnEventOptions) {
  return onEvent('invoiceClosed', eventHandler, options)
}

export function onPopupClosed(eventHandler: EventCallback['popupClosed'], options?: OnEventOptions) {
  return onEvent('popupClosed', eventHandler, options)
}

export function onQrTextReceived(eventHandler: EventCallback['qrTextReceived'], options?: OnEventOptions) {
  return onEvent('qrTextReceived', eventHandler, options)
}

export function onScanQrPopupClosed(eventHandler: EventCallback['scanQrPopupClosed'], options?: OnEventOptions) {
  return onEvent('scanQrPopupClosed', eventHandler, options)
}

export function onClipboardTextReceived(eventHandler: EventCallback['clipboardTextReceived'], options?: OnEventOptions) {
  return onEvent('clipboardTextReceived', eventHandler, options)
}

export function onWriteAccessRequested(eventHandler: EventCallback['writeAccessRequested'], options?: OnEventOptions) {
  return onEvent('writeAccessRequested', eventHandler, options)
}

export function onContactRequested(eventHandler: EventCallback['contactRequested'], options?: OnEventOptions) {
  return onEvent('contactRequested', eventHandler, options)
}

export function onBiometricManagerUpdated(eventHandler: EventCallback['biometricManagerUpdated'], options?: OnEventOptions) {
  return onEvent('biometricManagerUpdated', eventHandler, options)
}

export function onBiometricAuthRequested(eventHandler: EventCallback['biometricAuthRequested'], options?: OnEventOptions) {
  return onEvent('biometricAuthRequested', eventHandler, options)
}

export function onBiometricTokenUpdated(eventHandler: EventCallback['biometricTokenUpdated'], options?: OnEventOptions) {
  return onEvent('biometricTokenUpdated', eventHandler, options)
}

export function onFullscreenChanged(eventHandler: EventCallback['fullscreenChanged'], options?: OnEventOptions) {
  return onEvent('fullscreenChanged', eventHandler, options)
}

export function onFullscreenFailed(eventHandler: EventCallback['fullscreenFailed'], options?: OnEventOptions) {
  return onEvent('fullscreenFailed', eventHandler, options)
}

export function onHomeScreenAdded(eventHandler: EventCallback['homeScreenAdded'], options?: OnEventOptions) {
  return onEvent('homeScreenAdded', eventHandler, options)
}

export function onHomeScreenChecked(eventHandler: EventCallback['homeScreenChecked'], options?: OnEventOptions) {
  return onEvent('homeScreenChecked', eventHandler, options)
}

export function onAccelerometerStarted(eventHandler: EventCallback['accelerometerStarted'], options?: OnEventOptions) {
  return onEvent('accelerometerStarted', eventHandler, options)
}

export function onAccelerometerStopped(eventHandler: EventCallback['accelerometerStopped'], options?: OnEventOptions) {
  return onEvent('accelerometerStopped', eventHandler, options)
}

export function onAccelerometerChanged(eventHandler: EventCallback['accelerometerChanged'], options?: OnEventOptions) {
  return onEvent('accelerometerChanged', eventHandler, options)
}

export function onAccelerometerFailed(eventHandler: EventCallback['accelerometerFailed'], options?: OnEventOptions) {
  return onEvent('accelerometerFailed', eventHandler, options)
}

export function onDeviceOrientationStarted(eventHandler: EventCallback['deviceOrientationStarted'], options?: OnEventOptions) {
  return onEvent('deviceOrientationStarted', eventHandler, options)
}

export function onDeviceOrientationStopped(eventHandler: EventCallback['deviceOrientationStopped'], options?: OnEventOptions) {
  return onEvent('deviceOrientationStopped', eventHandler, options)
}

export function onDeviceOrientationChanged(eventHandler: EventCallback['deviceOrientationChanged'], options?: OnEventOptions) {
  return onEvent('deviceOrientationChanged', eventHandler, options)
}

export function onDeviceOrientationFailed(eventHandler: EventCallback['deviceOrientationFailed'], options?: OnEventOptions) {
  return onEvent('deviceOrientationFailed', eventHandler, options)
}

export function onGyroscopeStarted(eventHandler: EventCallback['gyroscopeStarted'], options?: OnEventOptions) {
  return onEvent('gyroscopeStarted', eventHandler, options)
}

export function onGyroscopeStopped(eventHandler: EventCallback['gyroscopeStopped'], options?: OnEventOptions) {
  return onEvent('gyroscopeStopped', eventHandler, options)
}

export function onGyroscopeChanged(eventHandler: EventCallback['gyroscopeChanged'], options?: OnEventOptions) {
  return onEvent('gyroscopeChanged', eventHandler, options)
}

export function onGyroscopeFailed(eventHandler: EventCallback['gyroscopeFailed'], options?: OnEventOptions) {
  return onEvent('gyroscopeFailed', eventHandler, options)
}

export function onLocationManagerUpdated(eventHandler: EventCallback['locationManagerUpdated'], options?: OnEventOptions) {
  return onEvent('locationManagerUpdated', eventHandler, options)
}

export function onLocationRequested(eventHandler: EventCallback['locationRequested'], options?: OnEventOptions) {
  return onEvent('locationRequested', eventHandler, options)
}

export function onShareMessageSent(eventHandler: EventCallback['shareMessageSent'], options?: OnEventOptions) {
  return onEvent('shareMessageSent', eventHandler, options)
}

export function onShareMessageFailed(eventHandler: EventCallback['shareMessageFailed'], options?: OnEventOptions) {
  return onEvent('shareMessageFailed', eventHandler, options)
}

export function onEmojiStatusSet(eventHandler: EventCallback['emojiStatusSet'], options?: OnEventOptions) {
  return onEvent('emojiStatusSet', eventHandler, options)
}

export function onEmojiStatusFailed(eventHandler: EventCallback['emojiStatusFailed'], options?: OnEventOptions) {
  return onEvent('emojiStatusFailed', eventHandler, options)
}

export function onEmojiStatusAccessRequested(eventHandler: EventCallback['emojiStatusAccessRequested'], options?: OnEventOptions) {
  return onEvent('emojiStatusAccessRequested', eventHandler, options)
}

export function onFileDownloadRequested(eventHandler: EventCallback['fileDownloadRequested'], options?: OnEventOptions) {
  return onEvent('fileDownloadRequested', eventHandler, options)
}

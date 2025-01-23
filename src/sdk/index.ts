import type { WebApp } from './webapp'

export * from './accelerometer'
export * from './back-button'
export * from './biometric-manager'
export * from './bottom-button'
export * from './cloud-storage'
export * from './device-orientation'
export * from './events'
export * from './gyroscope'
export * from './haptic-feedback'
export * from './location-manager'
export * from './popup'
export * from './qr-scanner'
export * from './settings-button'
export * from './theme'
export * from './viewport'
export * from './webapp'

export function getWebApp() {
  if (!('Telegram' in window))
    throw new Error('Telegram SDK not found. Make sure https://telegram.org/js/telegram-web-app.js script is installed.')
  // @ts-expect-error not typed
  return window?.Telegram?.WebApp as WebApp
}

import { useMiniApp } from '../composables/useMiniApp'
import { onEvent } from '../events'
import { getWebApp } from '../sdk'

const featureSupportVersion = {
  ClosingConfirmation: '6.2',
  CloudStorage: '6.9',
  RequestWriteAccess: '6.9',
  RequestContact: '6.9',
  SettingsButton: '7.0',
  BiometricManager: '7.2',
  DisableVerticalSwipes: '7.7',
}
function isFeatureSupported(name: keyof typeof featureSupportVersion) {
  return getWebApp().isVersionAtLeast(featureSupportVersion[name])
}

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebApp() {
  const webApp = getWebApp()
  const {
    initData,
    initDataUnsafe,
    version,
    isReady,
    platform,
    isPlatform,
    sendData,
    ready,
    close,
  } = useMiniApp({ version: '8.0' })

  const isPlatformUnknown = isPlatform('unknown')

  const canSendData = !isPlatformUnknown && initData === ''

  return {
    initData,
    initDataUnsafe,
    version,
    platform,
    isVersionAtLeast: webApp.isVersionAtLeast,
    sendData,
    ready,
    close,
    isReady,
    isPlatform,
    isPlatformUnknown,
    isFeatureSupported,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onEvent,
    /**
     * @deprecated
     */
    canSendData,
  }
}

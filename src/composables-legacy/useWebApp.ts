import { readonly, ref } from 'vue'
import { onEvent } from '../events'
import { WebApp } from '../sdk'

const isReady = ref(false)

const ready: typeof WebApp.ready = (...params) => {
  WebApp.ready(...params)
  isReady.value = true
}

function isPlatform(name:
    | (string & Record<never, never>)
    | 'unknown'
    | 'android'
    | 'android_x'
    | 'ios'
    | 'macos'
    | 'tdesktop'
    | 'weba'
    | 'webk'
    | 'unigram') {
  return WebApp.platform === name
}

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
  return WebApp.isVersionAtLeast(featureSupportVersion[name])
}

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebApp() {
  const {
    initData,
    initDataUnsafe,
    version,
    platform,
    isVersionAtLeast,
    sendData,
    close,
  } = WebApp

  const isPlatformUnknown = isPlatform('unknown')

  const canSendData = !isPlatformUnknown && initData === ''

  return {
    initData,
    initDataUnsafe,
    version,
    platform,
    isVersionAtLeast,
    sendData,
    ready,
    close,
    isReady: readonly(isReady),
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

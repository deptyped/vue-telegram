import { readonly, ref } from 'vue'
import { onEvent } from '../events'

const isReady = ref(false)

const ready: typeof Telegram.WebApp.ready = (...params) => {
  Telegram.WebApp.ready(...params)
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
  return Telegram.WebApp.platform === name
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
  return Telegram.WebApp.isVersionAtLeast(featureSupportVersion[name])
}

export function useWebApp() {
  const {
    initData,
    initDataUnsafe,
    version,
    platform,
    isVersionAtLeast,
    sendData,
    close,
  } = Telegram.WebApp

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

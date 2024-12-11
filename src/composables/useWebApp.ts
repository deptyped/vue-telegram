import type { OnEventOptions, OnEventWithOptions } from '../types'
import { onMounted, onUnmounted, readonly, ref } from 'vue'

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
  const onEvent: OnEventWithOptions<OnEventOptions> = (
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
    onEvent,
    sendData,
    ready,
    close,
    isReady: readonly(isReady),
    isPlatform,
    isPlatformUnknown,
    isFeatureSupported,
    /**
     * @deprecated
     */
    canSendData,
  }
}

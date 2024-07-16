import { onMounted, onUnmounted, readonly, ref } from "vue"
import { OnEventOptions, OnEventWithOptions } from "~/types"

const {
  initData,
  initDataUnsafe,
  version,
  platform,
  isVersionAtLeast,
  sendData,
  close,
} = Telegram.WebApp

const isReady = ref(false)

const ready: typeof Telegram.WebApp.ready = (...params) => {
  Telegram.WebApp.ready(...params)
  isReady.value = true
}

const isPlatform = (name: string) => Telegram.WebApp.platform === name

const isPlatformUnknown = isPlatform("unknown")
const isPlatformAndroid = isPlatform("android")
const isPlatformAndroidX = isPlatform("android_x")
const isPlatformIOS = isPlatform("ios")
const isPlatformMacOS = isPlatform("macos")
const isPlatformTDesktop = isPlatform("tdesktop")
const isPlatformWebA = isPlatform("weba")
const isPlatformWebK = isPlatform("webk")
const isPlatformUnigram = isPlatform("unigram")

const canSendData = !isPlatformUnknown && Telegram.WebApp.initData === ""

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
    } else {
      onMounted(on)
      onUnmounted(off)
    }

    return {
      off,
    }
  }

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
    isPlatformAndroid,
    isPlatformAndroidX,
    isPlatformIOS,
    isPlatformMacOS,
    isPlatformTDesktop,
    isPlatformWebA,
    isPlatformWebK,
    isPlatformUnigram,
    canSendData,
  }
}

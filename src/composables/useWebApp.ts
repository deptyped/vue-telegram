import { onMounted, onUnmounted, readonly, ref } from "vue"

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

const canSendData = !isPlatformUnknown && Telegram.WebApp.initData === ""

export function useWebApp() {
  const onEvent: typeof Telegram.WebApp.onEvent = (...params) => {
    onMounted(() =>
      Telegram.WebApp.onEvent(
        ...(params as Parameters<typeof Telegram.WebApp.onEvent>),
      ),
    )
    onUnmounted(() =>
      Telegram.WebApp.offEvent(
        ...(params as Parameters<typeof Telegram.WebApp.offEvent>),
      ),
    )
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
    canSendData,
  }
}

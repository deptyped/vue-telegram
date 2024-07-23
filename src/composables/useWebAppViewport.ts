import { computed, readonly, ref } from "vue"
import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const isExpanded = ref(Telegram.WebApp.isExpanded)
const viewportHeight = ref(Telegram.WebApp.viewportHeight)
const viewportStableHeight = ref(Telegram.WebApp.viewportStableHeight)
const isVerticalSwipesEnabled = ref(Telegram.WebApp.isVerticalSwipesEnabled)

function updateState() {
  isExpanded.value = Telegram.WebApp.isExpanded
  viewportHeight.value = Telegram.WebApp.viewportHeight
  viewportStableHeight.value = Telegram.WebApp.viewportStableHeight
  isVerticalSwipesEnabled.value = Telegram.WebApp.isVerticalSwipesEnabled
}

function expand(...params: Parameters<typeof Telegram.WebApp.expand>) {
  Telegram.WebApp.expand(...params)
  updateState()
}

const enableVerticalSwipes: typeof Telegram.WebApp.enableVerticalSwipes = (
  ...params
) => {
  Telegram.WebApp.enableVerticalSwipes(...params)
  updateState()
}

const disableVerticalSwipes: typeof Telegram.WebApp.disableVerticalSwipes = (
  ...params
) => {
  Telegram.WebApp.disableVerticalSwipes(...params)
  updateState()
}

export function useWebAppViewport() {
  const { onEvent } = useWebApp()

  const onViewportChanged = (
    eventHandler: ViewportChangedCallback,
    options?: OnEventOptions,
  ) => onEvent("viewportChanged", eventHandler, options)

  onViewportChanged(updateState)

  return {
    isExpanded: readonly(isExpanded),
    viewportHeight: readonly(viewportHeight),
    viewportStableHeight: readonly(viewportStableHeight),
    expand,
    onViewportChanged,
    isVerticalSwipesEnabled: computed({
      get() {
        return isVerticalSwipesEnabled.value
      },
      set(isEnabled) {
        isEnabled ? enableVerticalSwipes() : disableVerticalSwipes()
      },
    }),
    enableVerticalSwipes,
    disableVerticalSwipes,
  }
}

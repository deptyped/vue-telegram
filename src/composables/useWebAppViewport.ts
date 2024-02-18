import { readonly, ref } from "vue"
import { useWebApp } from "./useWebApp"
import type { OnViewportChangedCallback } from "~/types"

const isExpanded = ref(Telegram.WebApp.isExpanded)
const viewportHeight = ref(Telegram.WebApp.viewportHeight)
const viewportStableHeight = ref(Telegram.WebApp.viewportStableHeight)

function updateState() {
  isExpanded.value = Telegram.WebApp.isExpanded
  viewportHeight.value = Telegram.WebApp.viewportHeight
  viewportStableHeight.value = Telegram.WebApp.viewportStableHeight
}

function expand(...params: Parameters<typeof Telegram.WebApp.expand>) {
  Telegram.WebApp.expand(...params)
  updateState()
}

export function useWebAppViewport() {
  const { onEvent } = useWebApp()

  const onViewportChanged = (eventHandler: OnViewportChangedCallback) =>
    onEvent("viewportChanged", eventHandler)

  onViewportChanged(updateState)

  return {
    isExpanded: readonly(isExpanded),
    viewportHeight: readonly(viewportHeight),
    viewportStableHeight: readonly(viewportStableHeight),
    expand,
    onViewportChanged,
  }
}

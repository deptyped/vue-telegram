import { ref } from 'vue'
import { useWebApp } from './useWebApp'

const isExpanded = ref(Telegram.WebApp.isExpanded)
const viewportHeight = ref(Telegram.WebApp.viewportHeight)
const viewportStableHeight = ref(Telegram.WebApp.viewportStableHeight)

function updateState() {
  isExpanded.value = Telegram.WebApp.isExpanded
  viewportHeight.value = Telegram.WebApp.viewportHeight
  viewportStableHeight.value = Telegram.WebApp.viewportStableHeight
}

const expand: typeof Telegram.WebApp.expand = (...params) => {
  Telegram.WebApp.expand(...params)
  updateState()
}

export function useWebAppViewport() {
  const { onEvent } = useWebApp()

  const onViewportChanged = (eventHandler: (eventData: { isStateStable: boolean }) => void) =>
    onEvent('viewportChanged', eventHandler)

  onViewportChanged(updateState)

  return {
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    expand,
    onViewportChanged,
  }
}

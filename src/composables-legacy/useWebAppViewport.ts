import { computed, readonly, ref } from 'vue'
import { onViewportChanged } from '../events'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const isExpanded = ref(WebApp.isExpanded)
  const viewportHeight = ref(WebApp.viewportHeight)
  const viewportStableHeight = ref(WebApp.viewportStableHeight)
  const isVerticalSwipesEnabled = ref(WebApp.isVerticalSwipesEnabled)

  function updateState() {
    isExpanded.value = WebApp.isExpanded
    viewportHeight.value = WebApp.viewportHeight
    viewportStableHeight.value = WebApp.viewportStableHeight
    isVerticalSwipesEnabled.value = WebApp.isVerticalSwipesEnabled
  }

  function expand(...params: Parameters<typeof WebApp.expand>) {
    WebApp.expand(...params)
    updateState()
  }

  const enableVerticalSwipes: typeof WebApp.enableVerticalSwipes = (
    ...params
  ) => {
    WebApp.enableVerticalSwipes(...params)
    updateState()
  }

  const disableVerticalSwipes: typeof WebApp.disableVerticalSwipes = (
    ...params
  ) => {
    WebApp.disableVerticalSwipes(...params)
    updateState()
  }

  return {
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    isVerticalSwipesEnabled,
    updateState,
    expand,
    enableVerticalSwipes,
    disableVerticalSwipes,
  }
})

/**
 * @deprecated Use [`useViewport`](https://vue-tg.deptyped.com/mini-apps.html#useviewport) instead
 */
export function useWebAppViewport() {
  const {
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    isVerticalSwipesEnabled,
    updateState,
    expand,
    enableVerticalSwipes,
    disableVerticalSwipes,
  } = useStore()

  onViewportChanged(updateState)

  return {
    isExpanded: readonly(isExpanded),
    viewportHeight: readonly(viewportHeight),
    viewportStableHeight: readonly(viewportStableHeight),
    expand,
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
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onViewportChanged,
  }
}

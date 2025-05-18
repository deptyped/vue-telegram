import { useViewport } from '../composables/useViewport'
import { onViewportChanged } from '../events'

/**
 * @deprecated Use [`useViewport`](https://vue-tg.deptyped.com/mini-apps.html#useviewport) instead
 */
export function useWebAppViewport() {
  const {
    isExpanded,
    expand,
    viewportHeight,
    viewportStableHeight,
    isVerticalSwipesEnabled,
  } = useViewport('8.0')

  return {
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    expand,
    isVerticalSwipesEnabled,
    enableVerticalSwipes() {
      isVerticalSwipesEnabled.value = true
    },
    disableVerticalSwipes() {
      isVerticalSwipesEnabled.value = false
    },
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onViewportChanged,
  }
}

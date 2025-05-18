import type { WebApp } from '../sdk'
import { useTheme } from '../composables/useTheme'
import { onThemeChanged } from '../events'

/**
 * @deprecated Use [`useTheme`](https://vue-tg.deptyped.com/mini-apps.html#usetheme) instead
 */
export function useWebAppTheme() {
  const {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
  } = useTheme('8.0')

  return {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    setHeaderColor(color: Parameters<WebApp['setHeaderColor']>[0] | undefined) {
      if (color)
        headerColor.value = color
    },
    setBackgroundColor(color: Parameters<WebApp['setBackgroundColor']>[0] | undefined) {
      if (color)
        backgroundColor.value = color
    },
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onThemeChanged,
  }
}

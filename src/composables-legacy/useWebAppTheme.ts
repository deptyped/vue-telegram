import { computed, readonly, ref } from 'vue'
import { onThemeChanged } from '../events'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const colorScheme = ref(WebApp.colorScheme)
  const themeParams = ref(WebApp.themeParams)
  const headerColor = ref(WebApp.headerColor)
  const backgroundColor = ref(WebApp.backgroundColor)

  function updateState() {
    colorScheme.value = WebApp.colorScheme
    themeParams.value = {
      ...WebApp.themeParams,
    }
    headerColor.value = WebApp.headerColor
    backgroundColor.value = WebApp.backgroundColor
  }

  function setHeaderColor(
    ...params: Parameters<typeof WebApp.setHeaderColor>
  ) {
    WebApp.setHeaderColor(...params)
    updateState()
  }

  function setBackgroundColor(
    ...params: Parameters<typeof WebApp.setBackgroundColor>
  ) {
    WebApp.setBackgroundColor(...params)
    updateState()
  }

  return {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    updateState,
    setHeaderColor,
    setBackgroundColor,
  }
})

/**
 * @deprecated Use [`useTheme`](https://vue-tg.deptyped.com/mini-apps.html#usetheme) instead
 */
export function useWebAppTheme() {
  const {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    updateState,
    setHeaderColor,
    setBackgroundColor,
  } = useStore()

  onThemeChanged(updateState)

  return {
    colorScheme: readonly(colorScheme),
    themeParams: readonly(themeParams),
    headerColor: computed({
      get() {
        return headerColor.value
      },
      set(newValue) {
        setHeaderColor(newValue)
      },
    }),
    backgroundColor: computed({
      get() {
        return backgroundColor.value
      },
      set(newValue) {
        setBackgroundColor(newValue)
      },
    }),
    setHeaderColor,
    setBackgroundColor,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onThemeChanged,
  }
}

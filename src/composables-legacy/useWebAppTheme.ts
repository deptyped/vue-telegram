import { computed, readonly, ref } from 'vue'
import { onThemeChanged } from '../events'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const colorScheme = ref(Telegram.WebApp.colorScheme)
  const themeParams = ref(Telegram.WebApp.themeParams)
  const headerColor = ref(Telegram.WebApp.headerColor)
  const backgroundColor = ref(Telegram.WebApp.backgroundColor)

  function updateState() {
    colorScheme.value = Telegram.WebApp.colorScheme
    themeParams.value = {
      ...Telegram.WebApp.themeParams,
    }
    headerColor.value = Telegram.WebApp.headerColor
    backgroundColor.value = Telegram.WebApp.backgroundColor
  }

  function setHeaderColor(
    ...params: Parameters<typeof Telegram.WebApp.setHeaderColor>
  ) {
    Telegram.WebApp.setHeaderColor(...params)
    updateState()
  }

  function setBackgroundColor(
    ...params: Parameters<typeof Telegram.WebApp.setBackgroundColor>
  ) {
    Telegram.WebApp.setBackgroundColor(...params)
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

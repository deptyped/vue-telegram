import { computed, readonly, ref } from "vue"
import { useWebApp } from "./useWebApp"

const colorScheme = ref(Telegram.WebApp.colorScheme)
const themeParams = ref(Telegram.WebApp.themeParams)
const headerColor = ref(Telegram.WebApp.headerColor)
const backgroundColor = ref(Telegram.WebApp.backgroundColor)

function updateState() {
  colorScheme.value = Telegram.WebApp.colorScheme
  themeParams.value = Telegram.WebApp.themeParams
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

export function useWebAppTheme() {
  const { onEvent } = useWebApp()

  const onThemeChanged = (eventHandler: () => void) =>
    onEvent("themeChanged", eventHandler)

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
    onThemeChanged,
  }
}

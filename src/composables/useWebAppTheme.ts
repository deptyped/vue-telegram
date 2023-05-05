import { ref } from 'vue'
import { useWebApp } from './useWebApp'

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

const setHeaderColor: typeof Telegram.WebApp.setHeaderColor = (...params) => {
  Telegram.WebApp.setHeaderColor(...params)
  updateState()
}

const setBackgroundColor: typeof Telegram.WebApp.setBackgroundColor = (...params) => {
  Telegram.WebApp.setBackgroundColor(...params)
  updateState()
}

export function useWebAppTheme() {
  const { onEvent } = useWebApp()

  const onThemeChanged = (eventHandler: () => void) =>
    onEvent('themeChanged', eventHandler)

  onThemeChanged(updateState)

  return {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    setHeaderColor,
    setBackgroundColor,
    onThemeChanged,
  }
}

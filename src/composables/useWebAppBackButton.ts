import { ref } from 'vue'
import { useWebApp } from './useWebApp'

const isBackButtonVisible = ref(Telegram.WebApp.BackButton.isVisible)

function updateState() {
  isBackButtonVisible.value = Telegram.WebApp.BackButton.isVisible
}

function showBackButton(...params: Parameters<typeof Telegram.WebApp.BackButton.show>) {
  Telegram.WebApp.BackButton.show(...params)
  updateState()
}

function hideBackButton(...params: Parameters<typeof Telegram.WebApp.BackButton.hide>) {
  Telegram.WebApp.BackButton.hide(...params)
  updateState()
}

export function useWebAppBackButton() {
  const { onEvent } = useWebApp()

  const onBackButtonClicked = (eventHandler: () => void) =>
    onEvent('backButtonClicked', eventHandler)

  return {
    isBackButtonVisible,
    onBackButtonClicked,
    showBackButton,
    hideBackButton,
  }
}

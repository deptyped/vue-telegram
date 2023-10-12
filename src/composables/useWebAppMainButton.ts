import { ref } from 'vue'
import { useWebApp } from './useWebApp'
import type { OnMainButtonClickedCallback } from '~/types'

const mainButtonText = ref(Telegram.WebApp.MainButton.text)
const mainButtonColor = ref(Telegram.WebApp.MainButton.color)
const mainButtonTextColor = ref(Telegram.WebApp.MainButton.textColor)
const isMainButtonVisible = ref(Telegram.WebApp.MainButton.isVisible)
const isMainButtonActive = ref(Telegram.WebApp.MainButton.isActive)
const isMainButtonProgressVisible = ref(Telegram.WebApp.MainButton.isProgressVisible)

function updateState() {
  mainButtonText.value = Telegram.WebApp.MainButton.text
  mainButtonColor.value = Telegram.WebApp.MainButton.color
  mainButtonTextColor.value = Telegram.WebApp.MainButton.textColor
  isMainButtonVisible.value = Telegram.WebApp.MainButton.isVisible
  isMainButtonActive.value = Telegram.WebApp.MainButton.isActive
  isMainButtonProgressVisible.value = Telegram.WebApp.MainButton.isProgressVisible
}

function setMainButtonText(...params: Parameters<typeof Telegram.WebApp.MainButton.setText>) {
  Telegram.WebApp.MainButton.setText(...params)
  updateState()
}

function showMainButton(...params: Parameters<typeof Telegram.WebApp.MainButton.show>) {
  Telegram.WebApp.MainButton.show(...params)
  updateState()
}

function hideMainButton(...params: Parameters<typeof Telegram.WebApp.MainButton.hide>) {
  Telegram.WebApp.MainButton.hide(...params)
  updateState()
}

function enableMainButton(...params: Parameters<typeof Telegram.WebApp.MainButton.enable>) {
  Telegram.WebApp.MainButton.enable(...params)
  updateState()
}

function disableMainButton(...params: Parameters<typeof Telegram.WebApp.MainButton.disable>) {
  Telegram.WebApp.MainButton.disable(...params)
  updateState()
}

function showMainButtonProgress(...params: Parameters<typeof Telegram.WebApp.MainButton.showProgress>) {
  Telegram.WebApp.MainButton.showProgress(...params)
  updateState()
}

function hideMainButtonProgress(...params: Parameters<typeof Telegram.WebApp.MainButton.hideProgress>) {
  Telegram.WebApp.MainButton.hideProgress(...params)
  updateState()
}

function setMainButtonParams(...params: Parameters<typeof Telegram.WebApp.MainButton.setParams>) {
  Telegram.WebApp.MainButton.setParams(...params)
  updateState()
}

export function useWebAppMainButton() {
  const { onEvent } = useWebApp()

  const onMainButtonClicked = (eventHandler: OnMainButtonClickedCallback) =>
    onEvent('mainButtonClicked', eventHandler)

  return {
    mainButtonText,
    mainButtonColor,
    mainButtonTextColor,
    isMainButtonVisible,
    isMainButtonActive,
    isMainButtonProgressVisible,
    setMainButtonText,
    onMainButtonClicked,
    showMainButton,
    hideMainButton,
    enableMainButton,
    disableMainButton,
    showMainButtonProgress,
    hideMainButtonProgress,
    setMainButtonParams,
  }
}

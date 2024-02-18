import { computed, ref } from "vue"
import { useWebApp } from "./useWebApp"
import type { OnSettingsButtonClickedCallback } from "~/types"

const isSettingsButtonVisible = ref(Telegram.WebApp.SettingsButton.isVisible)

function updateState() {
  isSettingsButtonVisible.value = Telegram.WebApp.SettingsButton.isVisible
}

function showSettingsButton(
  ...params: Parameters<typeof Telegram.WebApp.SettingsButton.show>
) {
  Telegram.WebApp.SettingsButton.show(...params)
  updateState()
}

function hideSettingsButton(
  ...params: Parameters<typeof Telegram.WebApp.SettingsButton.hide>
) {
  Telegram.WebApp.SettingsButton.hide(...params)
  updateState()
}

export function useWebAppSettingsButton() {
  const { onEvent } = useWebApp()

  const onSettingsButtonClicked = (
    eventHandler: OnSettingsButtonClickedCallback,
  ) => onEvent("settingsButtonClicked", eventHandler)

  return {
    isSettingsButtonVisible: computed({
      get() {
        return isSettingsButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showSettingsButton() : hideSettingsButton()
      },
    }),
    onSettingsButtonClicked,
    showSettingsButton,
    hideSettingsButton,
  }
}

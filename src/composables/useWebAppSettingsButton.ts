import { computed, ref } from "vue"
import { defineStore } from "../utils"
import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const useStore = defineStore(() => {
  const isSettingsButtonVisible = ref(Telegram.WebApp.SettingsButton.isVisible)

  function showSettingsButton(
    ...params: Parameters<typeof Telegram.WebApp.SettingsButton.show>
  ) {
    Telegram.WebApp.SettingsButton.show(...params)
    isSettingsButtonVisible.value = true
  }

  function hideSettingsButton(
    ...params: Parameters<typeof Telegram.WebApp.SettingsButton.hide>
  ) {
    Telegram.WebApp.SettingsButton.hide(...params)
    isSettingsButtonVisible.value = false
  }

  return {
    isSettingsButtonVisible,
    showSettingsButton,
    hideSettingsButton,
  }
})

export function useWebAppSettingsButton() {
  const { isSettingsButtonVisible, showSettingsButton, hideSettingsButton } =
    useStore()

  const { onEvent } = useWebApp()

  const onSettingsButtonClicked = (
    eventHandler: SettingsButtonClickedCallback,
    options?: OnEventOptions,
  ) => onEvent("settingsButtonClicked", eventHandler, options)

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

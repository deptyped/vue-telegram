import { computed, ref } from "vue"
import { defineStore } from "../utils"
import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const useStore = defineStore(() => {
  const isBackButtonVisible = ref(Telegram.WebApp.BackButton.isVisible)

  function updateState() {
    isBackButtonVisible.value = Telegram.WebApp.BackButton.isVisible
  }

  function showBackButton(
    ...params: Parameters<typeof Telegram.WebApp.BackButton.show>
  ) {
    Telegram.WebApp.BackButton.show(...params)
    updateState()
  }

  function hideBackButton(
    ...params: Parameters<typeof Telegram.WebApp.BackButton.hide>
  ) {
    Telegram.WebApp.BackButton.hide(...params)
    updateState()
  }

  return { isBackButtonVisible, showBackButton, hideBackButton }
})

export function useWebAppBackButton() {
  const { isBackButtonVisible, showBackButton, hideBackButton } = useStore()

  const { onEvent } = useWebApp()

  const onBackButtonClicked = (
    eventHandler: BackButtonClickedCallback,
    options?: OnEventOptions,
  ) => onEvent("backButtonClicked", eventHandler, options)

  return {
    isBackButtonVisible: computed({
      get() {
        return isBackButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showBackButton() : hideBackButton()
      },
    }),
    onBackButtonClicked,
    showBackButton,
    hideBackButton,
  }
}

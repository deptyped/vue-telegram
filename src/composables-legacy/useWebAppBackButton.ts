import { computed, ref } from 'vue'
import { onBackButtonClicked } from '../events'
import { defineStore } from '../utils'

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

/**
 * @deprecated Use [`useBackButton`](https://vue-tg.deptyped.com/mini-apps.html#usebackbutton) instead
 */
export function useWebAppBackButton() {
  const { isBackButtonVisible, showBackButton, hideBackButton } = useStore()

  return {
    isBackButtonVisible: computed({
      get() {
        return isBackButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showBackButton() : hideBackButton()
      },
    }),
    showBackButton,
    hideBackButton,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onBackButtonClicked,
  }
}

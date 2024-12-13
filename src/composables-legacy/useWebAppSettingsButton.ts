import { computed, ref } from 'vue'
import { onSettingsButtonClicked } from '../events'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const isSettingsButtonVisible = ref(WebApp.SettingsButton.isVisible)

  function showSettingsButton(
    ...params: Parameters<typeof WebApp.SettingsButton.show>
  ) {
    WebApp.SettingsButton.show(...params)
    isSettingsButtonVisible.value = true
  }

  function hideSettingsButton(
    ...params: Parameters<typeof WebApp.SettingsButton.hide>
  ) {
    WebApp.SettingsButton.hide(...params)
    isSettingsButtonVisible.value = false
  }

  return {
    isSettingsButtonVisible,
    showSettingsButton,
    hideSettingsButton,
  }
})

/**
 * @deprecated Use [`useSettingsButton`](https://vue-tg.deptyped.com/mini-apps.html#usesettingsbutton) instead
 */
export function useWebAppSettingsButton() {
  const { isSettingsButtonVisible, showSettingsButton, hideSettingsButton }
    = useStore()

  return {
    isSettingsButtonVisible: computed({
      get() {
        return isSettingsButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showSettingsButton() : hideSettingsButton()
      },
    }),
    showSettingsButton,
    hideSettingsButton,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onSettingsButtonClicked,
  }
}

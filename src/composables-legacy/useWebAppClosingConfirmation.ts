import { computed, ref } from 'vue'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const isClosingConfirmationEnabled = ref(WebApp.isClosingConfirmationEnabled)

  function updateStatus() {
    isClosingConfirmationEnabled.value = WebApp.isClosingConfirmationEnabled
  }

  function enableClosingConfirmation(
    ...params: Parameters<typeof WebApp.enableClosingConfirmation>
  ) {
    WebApp.enableClosingConfirmation(...params)
    updateStatus()
  }

  function disableClosingConfirmation(
    ...params: Parameters<typeof WebApp.disableClosingConfirmation>
  ) {
    WebApp.disableClosingConfirmation(...params)
    updateStatus()
  }

  return {
    isClosingConfirmationEnabled,
    updateStatus,
    enableClosingConfirmation,
    disableClosingConfirmation,
  }
})

/**
 * @deprecated Use [`useClosingConfirmation`](https://vue-tg.deptyped.com/mini-apps.html#useclosingconfirmation) instead
 */
export function useWebAppClosingConfirmation() {
  const {
    isClosingConfirmationEnabled,
    enableClosingConfirmation,
    disableClosingConfirmation,
  } = useStore()

  return {
    isClosingConfirmationEnabled: computed({
      get() {
        return isClosingConfirmationEnabled.value
      },
      set(isEnabled) {
        isEnabled ? enableClosingConfirmation() : disableClosingConfirmation()
      },
    }),
    enableClosingConfirmation,
    disableClosingConfirmation,
  }
}

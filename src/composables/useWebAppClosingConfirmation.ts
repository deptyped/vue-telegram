import { computed, ref } from "vue"

const isClosingConfirmationEnabled = ref(
  Telegram.WebApp.isClosingConfirmationEnabled,
)

function updateStatus() {
  isClosingConfirmationEnabled.value =
    Telegram.WebApp.isClosingConfirmationEnabled
}

function enableClosingConfirmation(
  ...params: Parameters<typeof Telegram.WebApp.enableClosingConfirmation>
) {
  Telegram.WebApp.enableClosingConfirmation(...params)
  updateStatus()
}

function disableClosingConfirmation(
  ...params: Parameters<typeof Telegram.WebApp.disableClosingConfirmation>
) {
  Telegram.WebApp.disableClosingConfirmation(...params)
  updateStatus()
}

export function useWebAppClosingConfirmation() {
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

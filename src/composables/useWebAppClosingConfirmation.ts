import { ref } from 'vue'

const isClosingConfirmationEnabled = ref(Telegram.WebApp.isClosingConfirmationEnabled)

function updateStatus() {
  isClosingConfirmationEnabled.value = Telegram.WebApp.isClosingConfirmationEnabled
}

const enableClosingConfirmation: typeof Telegram.WebApp.enableClosingConfirmation = (...params) => {
  Telegram.WebApp.enableClosingConfirmation(...params)
  updateStatus()
}

const disableClosingConfirmation: typeof Telegram.WebApp.disableClosingConfirmation = (...params) => {
  Telegram.WebApp.disableClosingConfirmation(...params)
  updateStatus()
}

export function useWebAppClosingConfirmation() {
  return {
    isClosingConfirmationEnabled,
    enableClosingConfirmation,
    disableClosingConfirmation,
  }
}

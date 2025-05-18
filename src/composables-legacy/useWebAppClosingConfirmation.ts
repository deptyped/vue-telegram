import { useMiniApp } from '../composables/useMiniApp'

/**
 * @deprecated Use [`useClosingConfirmation`](https://vue-tg.deptyped.com/mini-apps.html#useclosingconfirmation) instead
 */
export function useWebAppClosingConfirmation() {
  const { isClosingConfirmationEnabled } = useMiniApp('8.0')

  return {
    isClosingConfirmationEnabled,
    enableClosingConfirmation() {
      isClosingConfirmationEnabled.value = true
    },
    disableClosingConfirmation() {
      isClosingConfirmationEnabled.value = false
    },
  }
}

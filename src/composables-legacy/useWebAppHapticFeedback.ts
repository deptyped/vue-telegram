import { useHapticFeedback } from '../composables/useHapticFeedback'

/**
 * @deprecated Use [`useHapticFeedback`](https://vue-tg.deptyped.com/mini-apps.html#usehapticfeedback) instead
 */
export function useWebAppHapticFeedback() {
  const { impactOccurred, notificationOccurred, selectionChanged } = useHapticFeedback('8.0')

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  }
}

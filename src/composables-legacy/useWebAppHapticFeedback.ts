/**
 * @deprecated Use [`useHapticFeedback`](https://vue-tg.deptyped.com/mini-apps.html#usehapticfeedback) instead
 */
export function useWebAppHapticFeedback() {
  const { impactOccurred, notificationOccurred, selectionChanged }
    = Telegram.WebApp.HapticFeedback

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  }
}

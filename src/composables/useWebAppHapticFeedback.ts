const { impactOccurred, notificationOccurred, selectionChanged } =
  Telegram.WebApp.HapticFeedback

export function useWebAppHapticFeedback() {
  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  }
}

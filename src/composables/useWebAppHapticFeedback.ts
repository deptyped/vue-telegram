export function useWebAppHapticFeedback() {
  const { impactOccurred, notificationOccurred, selectionChanged } =
    Telegram.WebApp.HapticFeedback

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  }
}

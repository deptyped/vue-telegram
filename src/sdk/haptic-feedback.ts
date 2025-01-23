export type HapticFeedback = {
  impactOccurred: (
    style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
  ) => HapticFeedback
  notificationOccurred: (
    type: 'error' | 'success' | 'warning'
  ) => HapticFeedback
  selectionChanged: () => HapticFeedback
}

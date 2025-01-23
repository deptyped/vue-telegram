import { createComposablesWithVersion } from './helpers'

export const {
  useAccelerometer,
  useBackButton,
  useBiometricManager,
  useClipboard,
  useCloudStorage,
  useDeviceOrientation,
  useEmojiStatus,
  useGyroscope,
  useHapticFeedback,
  useHomeScreen,
  useLocationManager,
  useMainButton,
  useMiniApp,
  usePopup,
  useQrScanner,
  useSecondaryButton,
  useSettingsButton,
  useTheme,
  useViewport,
} = createComposablesWithVersion('7.7')

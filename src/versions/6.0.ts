import { createComposablesWithVersion } from './helpers'

export const {
  useAccelerometer,
  useBackButton,
  useBiometricManager,
  useClipboard,
  useCloudStorage,
  useDeviceOrientation,
  useDeviceStorage,
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
} = createComposablesWithVersion('6.0')

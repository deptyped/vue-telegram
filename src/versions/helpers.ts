import type { BotApiVersion } from '../types'
import { useAccelerometer as _useAccelerometer } from '../composables/useAccelerometer'
import { useBackButton as _useBackButton } from '../composables/useBackButton'
import { useBiometricManager as _useBiometricManager } from '../composables/useBiometricManager'
import { useClipboard as _useClipboard } from '../composables/useClipboard'
import { useCloudStorage as _useCloudStorage } from '../composables/useCloudStorage'
import { useDeviceOrientation as _useDeviceOrientation } from '../composables/useDeviceOrientation'
import { useDeviceStorage as _useDeviceStorage } from '../composables/useDeviceStorage'
import { useEmojiStatus as _useEmojiStatus } from '../composables/useEmojiStatus'
import { useGyroscope as _useGyroscope } from '../composables/useGyroscope'
import { useHapticFeedback as _useHapticFeedback } from '../composables/useHapticFeedback'
import { useHomeScreen as _useHomeScreen } from '../composables/useHomeScreen'
import { useLocationManager as _useLocationManager } from '../composables/useLocationManager'
import { useMainButton as _useMainButton } from '../composables/useMainButton'
import { useMiniApp as _useMiniApp } from '../composables/useMiniApp'
import { usePopup as _usePopup } from '../composables/usePopup'
import { useQrScanner as _useQrScanner } from '../composables/useQrScanner'
import { useSecondaryButton as _useSecondaryButton } from '../composables/useSecondaryButton'
import { useSettingsButton as _useSettingsButton } from '../composables/useSettingsButton'
import { useTheme as _useTheme } from '../composables/useTheme'
import { useViewport as _useViewport } from '../composables/useViewport'

export function createComposablesWithVersion<T extends BotApiVersion>(version: T) {
  return {
    useAccelerometer: () => _useAccelerometer({ version }),
    useBackButton: () => _useBackButton({ version }),
    useBiometricManager: () => _useBiometricManager({ version }),
    useClipboard: () => _useClipboard({ version }),
    useCloudStorage: () => _useCloudStorage({ version }),
    useDeviceOrientation: () => _useDeviceOrientation({ version }),
    useDeviceStorage: () => _useDeviceStorage({ version }),
    useEmojiStatus: () => _useEmojiStatus({ version }),
    useGyroscope: () => _useGyroscope({ version }),
    useHapticFeedback: () => _useHapticFeedback({ version }),
    useHomeScreen: () => _useHomeScreen({ version }),
    useLocationManager: () => _useLocationManager({ version }),
    useMainButton: () => _useMainButton({ version }),
    useMiniApp: () => _useMiniApp({ version }),
    usePopup: () => _usePopup({ version }),
    useQrScanner: () => _useQrScanner({ version }),
    useSecondaryButton: () => _useSecondaryButton({ version }),
    useSettingsButton: () => _useSettingsButton({ version }),
    useTheme: () => _useTheme({ version }),
    useViewport: () => _useViewport({ version }),
  }
}

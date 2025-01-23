import type { Accelerometer, AccelerometerCallback } from './accelerometer'
import type { BackButton } from './back-button'
import type { BiometricManager, BiometricManagerCallback } from './biometric-manager'
import type { BottomButton } from './bottom-button'
import type { CloudStorage, CloudStorageCallback } from './cloud-storage'
import type { DeviceOrientation, DeviceOrientationCallback } from './device-orientation'
import type { EventData, EventHandler } from './events'
import type { Gyroscope, GyroscopeCallback } from './gyroscope'
import type { HapticFeedback } from './haptic-feedback'
import type { LocationManager, LocationManagerCallback } from './location-manager'
import type { PopupParams } from './popup'
import type { ScanQrPopupParams } from './qr-scanner'
import type { SettingsButton } from './settings-button'
import type { ThemeParams } from './theme'
import type { ContentSafeAreaInset, SafeAreaInset } from './viewport'

export type WebApp = {
  initData: string
  initDataUnsafe: WebAppInitData
  version: string
  platform: string
  colorScheme: string
  themeParams: ThemeParams
  isActive: boolean
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  bottomBarColor: string
  isClosingConfirmationEnabled: boolean
  isVerticalSwipesEnabled: boolean
  isFullscreen: boolean
  isOrientationLocked: boolean
  safeAreaInset: SafeAreaInset
  contentSafeAreaInset: ContentSafeAreaInset
  BackButton: BackButton
  MainButton: BottomButton
  SecondaryButton: BottomButton
  SettingsButton: SettingsButton
  HapticFeedback: HapticFeedback
  CloudStorage: CloudStorage
  BiometricManager: BiometricManager
  Accelerometer: Accelerometer
  DeviceOrientation: DeviceOrientation
  Gyroscope: Gyroscope
  LocationManager: LocationManager
  isVersionAtLeast: (version: string) => boolean
  setHeaderColor: (color: 'bg_color' | 'secondary_bg_color' | (string & {})) => void
  setBackgroundColor: (color: 'bg_color' | 'secondary_bg_color' | (string & {})) => void
  setBottomBarColor: (color: 'bg_color' | 'secondary_bg_color' | 'bottom_bar_bg_color' | (string & {})) => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  enableVerticalSwipes: () => void
  disableVerticalSwipes: () => void
  requestFullscreen: () => void
  exitFullscreen: () => void
  lockOrientation: () => void
  unlockOrientation: () => void
  addToHomeScreen: () => void
  checkHomeScreenStatus: (callback?: WebAppCallback['checkHomeScreenStatus']) => void
  onEvent: EventHandler
  offEvent: EventHandler
  sendData: (data: string) => void
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
  openLink: (url: string, options?: { try_instant_view: boolean }) => void
  openTelegramLink: (url: string) => void
  openInvoice: (url: string, callback?: WebAppCallback['openInvoice']) => void
  shareToStory: (media_url: string, params?: StoryShareParams) => void
  shareMessage: (msg_id: string, callback?: WebAppCallback['shareMessage']) => void
  setEmojiStatus: (custom_emoji_id: string, params?: EmojiStatusParams, callback?: WebAppCallback['setEmojiStatus']) => void
  requestEmojiStatusAccess: (callback?: WebAppCallback['requestEmojiStatusAccess']) => void
  downloadFile: (params: DownloadFileParams, callback?: WebAppCallback['downloadFile']) => void
  showPopup: (params: PopupParams, callback?: WebAppCallback['showPopup']) => void
  showAlert: (message: string, callback?: WebAppCallback['showAlert']) => void
  showConfirm: (message: string, callback?: WebAppCallback['showConfirm']) => void
  showScanQrPopup: (params: ScanQrPopupParams, callback?: WebAppCallback['showScanQrPopup']) => void
  closeScanQrPopup: () => void
  readTextFromClipboard: (callback?: WebAppCallback['readTextFromClipboard']) => void
  requestWriteAccess: (callback?: WebAppCallback['requestWriteAccess']) => void
  requestContact: (callback?: WebAppCallback['requestContact']) => void
  ready: () => void
  expand: () => void
  close: () => void
}

export type WebAppCallback = {
  checkHomeScreenStatus: (status: EventData['homeScreenChecked']['status']) => void
  openInvoice: (status: EventData['invoiceClosed']['status']) => void
  shareMessage: (success: boolean) => void
  setEmojiStatus: (success: boolean) => void
  requestEmojiStatusAccess: (granted: boolean) => void
  downloadFile: (success: boolean) => void
  showPopup: (buttonId: string) => void
  showAlert: () => void
  showConfirm: (isConfirmed: boolean) => void
  showScanQrPopup: (text: string) => void
  readTextFromClipboard: (text: string) => void
  requestWriteAccess: (granted: boolean) => void
  requestContact: (granted: boolean) => void
  BiometricManager: BiometricManagerCallback
  CloudStorage: CloudStorageCallback
  Accelerometer: AccelerometerCallback
  DeviceOrientation: DeviceOrientationCallback
  Gyroscope: GyroscopeCallback
  LocationManager: LocationManagerCallback
}

export type StoryShareParams = {
  text?: string
  widget_link?: StoryWidgetLink
}

export type StoryWidgetLink = {
  url: string
  name?: string
}

export type EmojiStatusParams = {
  duration?: number
}

export type DownloadFileParams = {
  url: string
  file_name: string
}

export type WebAppInitData = {
  query_id?: string
  user?: WebAppUser
  receiver?: WebAppUser
  chat?: WebAppChat
  chat_type?: string
  chat_instance?: string
  start_param?: string
  can_send_after?: number
  auth_date: number
  hash: string
  signature: string
}

export type WebAppUser = {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: true
  added_to_attachment_menu?: true
  allows_write_to_pm?: true
  photo_url?: string
}

export type WebAppChat = {
  id: number
  type: string
  title: string
  username?: string
  photo_url?: string
}

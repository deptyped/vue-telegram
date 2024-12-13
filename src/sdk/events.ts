import type { LocationData } from './location-manager'

type RequestContactResponseSent = {
  status: 'sent'
  response: string
  responseUnsafe: {
    auth_date: string
    contact: {
      first_name: string
      last_name?: string
      phone_number: string
      user_id: number
    }
    hash: string
  }
}

type RequestContactResponseCancelled = {
  status: 'cancelled'
}

export type EventData = {
  viewportChanged: { isStateStable: boolean }
  invoiceClosed: { url: string, status: 'paid' | 'cancelled' | 'failed' | 'pending' }
  popupClosed: { button_id: string | null }
  qrTextReceived: { data: string }
  clipboardTextReceived: { data: string | null }
  writeAccessRequested: { status: 'allowed' | 'cancelled' }
  contactRequested: RequestContactResponseSent | RequestContactResponseCancelled
  biometricAuthRequested: { isAuthenticated: boolean, biometricToken?: string }
  biometricTokenUpdated: { isUpdated: boolean }
  fullscreenFailed: { error: 'UNSUPPORTED' | 'ALREADY_FULLSCREEN' }
  homeScreenChecked: { status: 'unsupported' | 'unknown' | 'added' | 'missed' }
  accelerometerFailed: { error: 'UNSUPPORTED' }
  deviceOrientationFailed: { error: 'UNSUPPORTED' }
  gyroscopeFailed: { error: 'UNSUPPORTED' }
  locationRequested: { locationData: LocationData }
  shareMessageFailed: { error: 'UNSUPPORTED' | 'MESSAGE_EXPIRED' | 'MESSAGE_SEND_FAILED' | 'USER_DECLINED' | 'UNKNOWN_ERROR' }
  emojiStatusFailed: { error: 'UNSUPPORTED' | 'SUGGESTED_EMOJI_INVALID' | 'DURATION_INVALID' | 'USER_DECLINED' | 'SERVER_ERROR' | 'UNKNOWN_ERROR' }
  emojiStatusAccessRequested: { status: 'allowed' | 'cancelled' }
  fileDownloadRequested: { status: 'downloading' | 'cancelled' }
}

export type EventCallback = {
  activated: () => void
  deactivated: () => void
  themeChanged: () => void
  viewportChanged: (eventData: EventData['viewportChanged']) => void
  safeAreaChanged: () => void
  contentSafeAreaChanged: () => void
  mainButtonClicked: () => void
  secondaryButtonClicked: () => void
  backButtonClicked: () => void
  settingsButtonClicked: () => void
  invoiceClosed: (eventData: EventData['invoiceClosed']) => void
  popupClosed: (eventData: EventData['popupClosed']) => void
  qrTextReceived: (eventData: EventData['qrTextReceived']) => void
  scanQrPopupClosed: () => void
  clipboardTextReceived: (eventData: EventData['clipboardTextReceived']) => void
  writeAccessRequested: (eventData: EventData['writeAccessRequested']) => void
  contactRequested: (eventData: EventData['contactRequested']) => void
  biometricManagerUpdated: () => void
  biometricAuthRequested: (eventData: EventData['biometricAuthRequested']) => void
  biometricTokenUpdated: (eventData: EventData['biometricTokenUpdated']) => void
  fullscreenChanged: () => void
  fullscreenFailed: (event: EventData['fullscreenFailed']) => void
  homeScreenAdded: () => void
  homeScreenChecked: (event: EventData['homeScreenChecked']) => void
  accelerometerStarted: () => void
  accelerometerStopped: () => void
  accelerometerChanged: () => void
  accelerometerFailed: (event: EventData['accelerometerFailed']) => void
  deviceOrientationStarted: () => void
  deviceOrientationStopped: () => void
  deviceOrientationChanged: () => void
  deviceOrientationFailed: (event: EventData['deviceOrientationFailed']) => void
  gyroscopeStarted: () => void
  gyroscopeStopped: () => void
  gyroscopeChanged: () => void
  gyroscopeFailed: (event: EventData['gyroscopeFailed']) => void
  locationManagerUpdated: () => void
  locationRequested: (event: EventData['locationRequested']) => void
  shareMessageSent: () => void
  shareMessageFailed: (event: EventData['shareMessageFailed']) => void
  emojiStatusSet: () => void
  emojiStatusFailed: (event: EventData['emojiStatusFailed']) => void
  emojiStatusAccessRequested: (event: EventData['emojiStatusAccessRequested']) => void
  fileDownloadRequested: (event: EventData['fileDownloadRequested']) => void
}

export type EventHandler = {
  <T extends keyof EventCallback>(eventType: T, eventHandler: EventCallback[T]): void
}

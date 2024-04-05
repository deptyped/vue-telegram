/**
 * Mini Apps
 */

export type OnThemeChangedCallback = () => void
export type OnViewportChangedCallback = (eventData: {
  isStateStable: boolean
}) => void
export type OnMainButtonClickedCallback = () => void
export type OnBackButtonClickedCallback = () => void
export type OnSettingsButtonClickedCallback = () => void
export type OnInvoiceClosedCallback = (eventData: {
  url: string
  status: "paid" | "cancelled" | "failed" | "pending"
}) => void
export type OnPopupClosedCallback = (eventData: {
  button_id: string | null
}) => void
export type OnQrTextReceivedCallback = (eventData: { data: string }) => void
export type OnClipboardTextReceivedCallback = (eventData: {
  data: string | null
}) => void
export type OnWriteAccessRequestedCallback = (eventData: {
  status: "allowed" | "cancelled"
}) => void
export type OnContactRequestedCallback = (eventData: {
  status: "sent" | "cancelled"
}) => void
export type OnBiometricAuthRequested = (eventData: {
  isAuthenticated: boolean
  biometricToken?: string
}) => void
export type OnBiometricTokenUpdated = (eventData: {
  isUpdated: boolean
}) => void

type OnEventReturn = {
  off: () => void
}

export type OnEventOptions = {
  /**
   * Disables automatic subscription management; you need to call the returned function `off` to unsubscribe.
   *
   * Set to `false` by default.
   */
  manual?: boolean
}

export type OnEventWithOptions<O> = {
  (
    eventType:
      | "themeChanged"
      | "mainButtonClicked"
      | "backButtonClicked"
      | "settingsButtonClicked"
      | "biometricManagerUpdated",
    eventHandler: () => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "popupClosed",
    eventHandler: (eventData: { button_id: string | null }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "viewportChanged",
    eventHandler: (eventData: { isStateStable: boolean }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "invoiceClosed",
    eventHandler: (eventData: {
      url: string
      status: "paid" | "cancelled" | "failed" | "pending"
    }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "qrTextReceived",
    eventHandler: (eventData: { data: string }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "clipboardTextReceived",
    eventHandler: (eventData: { data: string | null }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "writeAccessRequested",
    eventHandler: (eventData: { status: "allowed" | "cancelled" }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "contactRequested",
    eventHandler: (eventData: RequestContactResponse) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "biometricAuthRequested",
    eventHandler: (eventData: {
      isAuthenticated: boolean
      biometricToken?: string
    }) => void,
    options?: O,
  ): OnEventReturn
  (
    eventType: "biometricTokenUpdated",
    eventHandler: (eventData: { isUpdated: boolean }) => void,
    options?: O,
  ): OnEventReturn
}

/**
 * Widgets
 */

export type LoginWidgetUser = Pick<
  WebAppUser,
  "id" | "first_name" | "last_name" | "username" | "photo_url"
> &
  Pick<WebAppInitData, "auth_date" | "hash">

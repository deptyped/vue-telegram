/**
 * Mini Apps
 */

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
    eventType: "themeChanged",
    eventHandler: ThemeChangedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "mainButtonClicked",
    eventHandler: MainButtonClickedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "backButtonClicked",
    eventHandler: BackButtonClickedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "settingsButtonClicked",
    eventHandler: SettingsButtonClickedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "popupClosed",
    eventHandler: PopupClosedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "viewportChanged",
    eventHandler: ViewportChangedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "invoiceClosed",
    eventHandler: InvoiceClosedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "qrTextReceived",
    eventHandler: QrTextReceivedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "scanQrPopupClosed",
    eventHandler: ScanQrPopupClosedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "clipboardTextReceived",
    eventHandler: ClipboardTextReceivedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "writeAccessRequested",
    eventHandler: WriteAccessRequestedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "contactRequested",
    eventHandler: ContactRequestedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "biometricManagerUpdated",
    eventHandler: BiometricManagerUpdatedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "biometricAuthRequested",
    eventHandler: BiometricAuthRequestedCallback,
    options?: O,
  ): OnEventReturn
  (
    eventType: "biometricTokenUpdated",
    eventHandler: BiometricTokenUpdatedCallback,
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

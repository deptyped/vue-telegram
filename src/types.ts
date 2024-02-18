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

/**
 * Widgets
 */

export type LoginWidgetUser = Pick<
  WebAppUser,
  "id" | "first_name" | "last_name" | "username" | "photo_url"
> &
  Pick<WebAppInitData, "auth_date" | "hash">

import { onContactRequested, onWriteAccessRequested } from '../events'

export function useWebAppRequests() {
  const { requestContact, requestWriteAccess } = Telegram.WebApp

  return {
    requestContact,
    requestWriteAccess,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onContactRequested,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onWriteAccessRequested,
  }
}

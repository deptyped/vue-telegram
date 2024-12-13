import { onContactRequested, onWriteAccessRequested } from '../events'
import { WebApp } from '../sdk'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppRequests() {
  const { requestContact, requestWriteAccess } = WebApp

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

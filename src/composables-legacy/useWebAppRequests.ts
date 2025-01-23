import { useMiniApp } from '../composables/useMiniApp'
import { onContactRequested, onWriteAccessRequested } from '../events'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppRequests() {
  const { requestContact, requestWriteAccess } = useMiniApp({ version: '8.0' })

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

import type { PopupParams, WebAppCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { onPopupClosed } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify, promisifyWithNoData } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v62 = ReturnType<typeof usePopup62>
type AllFeatures = v62

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '6.2': Merge<Schema['6.0'], v62>
}

export type Popup
  = | SinceUntil<Schema, '6.0', '6.2'>
    | SinceLatest<Schema, '6.2'>

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function usePopup62() {
  const {
    webApp,
  } = useStore()

  const showConfirm = createCallbackOrPromiseMethod(
    (message: string, callback: WebAppCallback['showConfirm']) => webApp.showConfirm(message, callback),
    promisify,
  )
  const showAlert = createCallbackOrPromiseMethod(
    (message: string, callback: WebAppCallback['showAlert']) => webApp.showAlert(message, callback),
    promisifyWithNoData,
  )
  const showPopup = createCallbackOrPromiseMethod(
    (params: PopupParams, callback: WebAppCallback['showPopup']) => webApp.showPopup(params, callback),
    promisify,
  )

  return {
    showConfirm,
    showAlert,
    showPopup,
    onClose: onPopupClosed,
  }
}

export function usePopup<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<Popup, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '6.2', use: usePopup62 },
    ],
  )
}

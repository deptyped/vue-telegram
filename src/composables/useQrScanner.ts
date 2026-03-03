import type { ScanQrPopupParams, WebAppCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { onQrTextReceived, onScanQrPopupClosed } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v64 = ReturnType<typeof useQrScanner64>
type v77 = ReturnType<typeof useQrScanner77>
type AllFeatures = v64 & v77

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '6.4': Merge<Schema['6.0'], v64>
  '7.7': Merge<Schema['6.4'], v77>
}

export type QrScanner
  = | SinceUntil<Schema, '6.0', '6.4'>
    | SinceUntil<Schema, '6.4', '7.7'>
    | SinceLatest<Schema, '7.7'>

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useQrScanner64() {
  const {
    webApp,
  } = useStore()

  const showScanQrPopup = createCallbackOrPromiseMethod(
    (params: ScanQrPopupParams, callback: WebAppCallback['showScanQrPopup']) => webApp.showScanQrPopup(params, callback),
    promisify,
  )

  return {
    show: showScanQrPopup,
    close: webApp.closeScanQrPopup,
    onScan: onQrTextReceived,
  }
}

function useQrScanner77() {
  return {
    onClose: onScanQrPopupClosed,
  }
}

export function useQrScanner<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<QrScanner, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '6.4', use: useQrScanner64 },
      { since: '7.7', use: useQrScanner77 },
    ],
  )
}

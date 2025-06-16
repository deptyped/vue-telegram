import type { ScanQrPopupParams, WebAppCallback } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { onQrTextReceived, onScanQrPopupClosed } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type v64 = ReturnType<typeof useQrScanner64>
type v77 = ReturnType<typeof useQrScanner77>

export type Schema = {
  '6.0': Merge<Partial<v64 & v77>, object>
  '6.4': Merge<Schema['6.0'], v64>
  '7.7': Merge<Schema['6.4'], v77>
}

export type QrScanner =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.4'>> })
  | (Schema['6.4'] & { version: BotApiVersionRange<'6.4', BotApiPrevVersion<'7.7'>> })
  | (Schema['7.7'] & { version: BotApiVersionRange<'7.7', LATEST_VERSION> })

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

  const showScanQrPopupAsync = promisify(webApp.showScanQrPopup)

  function showScanQrPopup(params: ScanQrPopupParams): ReturnType<typeof showScanQrPopupAsync>
  function showScanQrPopup(params: ScanQrPopupParams, callback?: WebAppCallback['showScanQrPopup']): void
  function showScanQrPopup(params: ScanQrPopupParams, callback?: WebAppCallback['showScanQrPopup']): ReturnType<typeof showScanQrPopupAsync> | void {
    if (callback)
      webApp.showScanQrPopup(params, callback)
    else
      return showScanQrPopupAsync(params)
  }

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
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.4') && useQrScanner64()),
    ...(isVersionGreaterOrEqual(version, '7.7') && useQrScanner77()),
  } as VersionedReturnType<QrScanner, Version, keyof Schema>
}

import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { onQrTextReceived, onScanQrPopupClosed } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual } from '../utils'

type QrScannerV64 = ReturnType<typeof useQrScanner64>
type QrScannerV77 = ReturnType<typeof useQrScanner77>

type QrScannerV60to64 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.4'>>]: Merge<
    & Partial<QrScannerV64>,
    { version: version }
  >;
}

type QrScannerV64to77 = {
  [version in BotApiVersionRange<'6.4', BotApiPrevVersion<'7.7'>>]: Merge<
    QrScannerV60to64['6.0'],
    { version: version } & QrScannerV64
  >;
}
type QrScannerV77toLatest = {
  [version in BotApiVersionRange<'7.7', LATEST_VERSION>]: Merge<
    QrScannerV64to77['6.4'],
    { version: version } & QrScannerV77
  >;
}

type QrScanner =
  & QrScannerV60to64
  & QrScannerV64to77
  & QrScannerV77toLatest

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

  return {
    show: webApp.showScanQrPopup,
    close: webApp.closeScanQrPopup,
    onScan: onQrTextReceived,
  }
}

function useQrScanner77() {
  return {
    onClose: onScanQrPopupClosed,
  }
}

export function useQrScanner<Version extends BotApiVersion>(
  options?: { version?: Version },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...(isVersionGreaterOrEqual(version, '6.4') && useQrScanner64()),
    ...(isVersionGreaterOrEqual(version, '7.7')
      ? useQrScanner77()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<QrScanner, Version, '6.4' | '7.7'>
}

import type { PopupParams, WebAppCallback } from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { onPopupClosed } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual, promisify, promisifyWithNoData } from '../utils'

type Popup62 = ReturnType<typeof usePopup62>

type PopupV60 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.2'>>]: Merge<
    Partial<Popup62>,
    { version: version }
  >;
}

type PopupV62toLatest = {
  [version in BotApiVersionRange<'6.2', LATEST_VERSION>]: Merge<
    PopupV60['6.0'],
    { version: version } & Popup62
  >;
}

type Popup =
  & PopupV60
  & PopupV62toLatest

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

  const showConfirmAsync = promisify(webApp.showConfirm)

  function showConfirm(message: string): ReturnType<typeof showConfirmAsync>
  function showConfirm(message: string, callback?: WebAppCallback['showConfirm']): void
  function showConfirm(message: string, callback?: WebAppCallback['showConfirm']): ReturnType<typeof showConfirmAsync> | void {
    if (callback)
      webApp.showConfirm(message, callback)
    else
      return showConfirmAsync(message)
  }

  const showAlertAsync = promisifyWithNoData(webApp.showAlert)

  function showAlert(message: string): ReturnType<typeof showAlertAsync>
  function showAlert(message: string, callback?: WebAppCallback['showAlert']): void
  function showAlert(message: string, callback?: WebAppCallback['showAlert']): ReturnType<typeof showAlertAsync> | void {
    if (callback)
      webApp.showAlert(message, callback)
    else
      return showAlertAsync(message)
  }

  const showPopupAsync = promisify(webApp.showPopup)

  function showPopup(params: PopupParams): ReturnType<typeof showPopupAsync>
  function showPopup(params: PopupParams, callback?: WebAppCallback['showPopup']): void
  function showPopup(params: PopupParams, callback?: WebAppCallback['showPopup']): ReturnType<typeof showPopupAsync> | void {
    if (callback)
      webApp.showPopup(params, callback)
    else
      return showPopupAsync(params)
  }

  return {
    showConfirm,
    showAlert,
    showPopup,
    onClose: onPopupClosed,
  }
}

export function usePopup<Version extends BotApiVersion>(options?: { version?: Version }) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...(isVersionGreaterOrEqual(version, '6.2')
      ? usePopup62()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<Popup, Version, '6.2'>
}

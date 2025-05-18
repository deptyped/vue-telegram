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
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, promisifyWithNoData } from '../utils'

type v62 = ReturnType<typeof usePopup62>

export type Schema = {
  '6.0': Merge<Partial<v62>, object>
  '6.2': Merge<Schema['6.0'], v62>
}

export type Popup =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.2'>> })
  | (Schema['6.2'] & { version: BotApiVersionRange<'6.2', LATEST_VERSION> })

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

export function usePopup<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.2') && usePopup62()),
  } as VersionedReturnType<Popup, Version, keyof Schema>
}

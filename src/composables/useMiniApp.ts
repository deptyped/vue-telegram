import type {
  DownloadFileParams,
  WebAppCallback,
} from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { computed, readonly, ref } from 'vue'
import { onActivated, onContactRequested, onDeactivated, onFileDownloadRequested, onInvoiceClosed, onShareMessageFailed, onShareMessageSent, onWriteAccessRequested } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, isVersionGreaterOrEqual, promisify, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useMiniApp60>
type v61 = ReturnType<typeof useMiniApp61>
type v62 = ReturnType<typeof useMiniApp62>
type v67 = ReturnType<typeof useMiniApp67>
type v69 = ReturnType<typeof useMiniApp69>
type v78 = ReturnType<typeof useMiniApp78>
type v80 = ReturnType<typeof useMiniApp80>
type v91 = ReturnType<typeof useMiniApp91>
type AllFeatures = v61 & v62 & v67 & v69 & v78 & v80 & v91

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '6.1': Merge<Schema['6.0'], v61>
  '6.2': Merge<Schema['6.1'], v62>
  '6.7': Merge<Schema['6.2'], v67>
  '6.9': Merge<Schema['6.7'], v69>
  '7.8': Merge<Schema['6.9'], v78>
  '8.0': Merge<Schema['7.8'], v80>
  '9.1': Merge<Schema['8.0'], v91>
}

export type MiniApp
  = | SinceUntil<Schema, '6.0', '6.1'>
    | SinceUntil<Schema, '6.1', '6.2'>
    | SinceUntil<Schema, '6.2', '6.7'>
    | SinceUntil<Schema, '6.7', '6.9'>
    | SinceUntil<Schema, '6.9', '7.8'>
    | SinceUntil<Schema, '7.8', '8.0'>
    | SinceUntil<Schema, '8.0', '9.1'>
    | SinceLatest<Schema, '9.1'>

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const isReady = ref(false)
  const isClosingConfirmationEnabled = ref(webApp.isClosingConfirmationEnabled)
  const isActive = ref(webApp.isActive)

  const updateState = () => {
    isActive.value = webApp.isActive
    isClosingConfirmationEnabled.value = webApp.isClosingConfirmationEnabled
  }

  return {
    webApp,
    updateState,
    isReady,
    isActive,
    isClosingConfirmationEnabled,
  }
})

function useMiniApp60() {
  const {
    webApp,
    isReady,
    isActive,
    isClosingConfirmationEnabled,
  } = useStore()

  return {
    initData: webApp.initData,
    initDataUnsafe: webApp.initDataUnsafe,
    platform: webApp.platform,
    sendData: webApp.sendData,
    openLink: webApp.openLink,
    openTelegramLink: webApp.openTelegramLink,
    ready: wrapFunction(webApp.ready, {
      hooks: {
        after: () => {
          isReady.value = true
        },
      },
    }),
    close: webApp.close,
    isClosingConfirmationEnabled: readonly(isClosingConfirmationEnabled),
    isActive: readonly(isActive),
    isReady: readonly(isReady),
    isPlatform,
  }
}

function useMiniApp61() {
  const { webApp } = useStore()

  const openInvoice = createCallbackOrPromiseMethod(
    (url: string, callback: WebAppCallback['openInvoice']) => webApp.openInvoice(url, callback),
    promisify,
  )

  return {
    openInvoice,
    onInvoiceClose: onInvoiceClosed,
  }
}

function useMiniApp62() {
  const {
    webApp,
    updateState,
    isClosingConfirmationEnabled,
  } = useStore()

  const enableClosingConfirmation = wrapFunction(webApp.enableClosingConfirmation, {
    hooks: {
      after: updateState,
    },
  })
  const disableClosingConfirmation = wrapFunction(webApp.disableClosingConfirmation, {
    hooks: {
      after: updateState,
    },
  })

  return {
    isClosingConfirmationEnabled: computed({
      get() {
        return isClosingConfirmationEnabled.value
      },
      set(isEnabled) {
        if (isEnabled)
          enableClosingConfirmation()
        else
          disableClosingConfirmation()
      },
    }),
  }
}

function useMiniApp67() {
  const { webApp } = useStore()

  return {
    switchInlineQuery: webApp.switchInlineQuery,
  }
}

function useMiniApp69() {
  const { webApp } = useStore()

  const requestContact = createCallbackOrPromiseMethod(
    (callback: WebAppCallback['requestContact']) => webApp.requestContact(callback),
    promisify,
  )
  const requestWriteAccess = createCallbackOrPromiseMethod(
    (callback: WebAppCallback['requestWriteAccess']) => webApp.requestWriteAccess(callback),
    promisify,
  )

  return {
    requestContact,
    requestWriteAccess,
    onContactRequest: onContactRequested,
    onWriteAccessRequest: onWriteAccessRequested,
  }
}

function useMiniApp78() {
  const { webApp } = useStore()

  return {
    shareToStory: webApp.shareToStory,
  }
}

function useMiniApp80() {
  const {
    webApp,
    updateState,
  } = useStore()

  const shareMessage = createCallbackOrPromiseMethod(
    (msg_id: string, callback: WebAppCallback['shareMessage']) => webApp.shareMessage(msg_id, callback),
    promisify,
  )
  const downloadFile = createCallbackOrPromiseMethod(
    (params: DownloadFileParams, callback: WebAppCallback['downloadFile']) => webApp.downloadFile(params, callback),
    promisify,
  )

  onActivated(updateState)
  onDeactivated(updateState)

  return {
    shareMessage,
    downloadFile,
    onActive: onActivated,
    onDeactivate: onDeactivated,
    onDeactive: onDeactivated,
    onShareMessageSent,
    onShareMessageFail: onShareMessageFailed,
    onFileDownloadRequest: onFileDownloadRequested,
  }
}

function useMiniApp91() {
  const { webApp } = useStore()

  return {
    hideKeyboard: webApp.hideKeyboard,
  }
}

export function useMiniApp<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<MiniApp, Version, keyof Schema>(
    baseVersion,
    webApp,
    useMiniApp60,
    [
      { since: '6.1', use: useMiniApp61 },
      { since: '6.2', use: useMiniApp62 },
      { since: '6.7', use: useMiniApp67 },
      { since: '6.9', use: useMiniApp69 },
      { since: '7.8', use: useMiniApp78 },
      { since: '8.0', use: useMiniApp80 },
      { since: '9.1', use: useMiniApp91 },
    ],
  )
}

export function isVersionAtLeast(version: BotApiVersion) {
  return isVersionGreaterOrEqual(getWebApp().version, version)
}

function isPlatform(
  name:
    | (string & Record<never, never>)
    | 'unknown'
    | 'android'
    | 'android_x'
    | 'ios'
    | 'macos'
    | 'tdesktop'
    | 'weba'
    | 'webk'
    | 'web' // webk
    | 'unigram',
) {
  return getWebApp().platform === name
}

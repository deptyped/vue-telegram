import type {
  DownloadFileParams,
  WebAppCallback,
} from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { computed, readonly, ref } from 'vue'
import { onActivated, onContactRequested, onDeactivated, onFileDownloadRequested, onInvoiceClosed, onShareMessageFailed, onShareMessageSent, onWriteAccessRequested } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, wrapFunction } from '../utils'

type MiniAppV60 = ReturnType<typeof useMiniApp60>
type MiniAppV61 = ReturnType<typeof useMiniApp61>
type MiniAppV62 = ReturnType<typeof useMiniApp62>
type MiniAppV67 = ReturnType<typeof useMiniApp67>
type MiniAppV69 = ReturnType<typeof useMiniApp69>
type MiniAppV78 = ReturnType<typeof useMiniApp78>
type MiniAppV80 = ReturnType<typeof useMiniApp80>

type MiniAppV60to61 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>>]: Merge<
    Partial<
      & MiniAppV61
      & MiniAppV62
      & MiniAppV67
      & MiniAppV69
      & MiniAppV78
      & MiniAppV80
    >,
    { version: version } & MiniAppV60
  >;
}

type MiniAppV61to62 = {
  [version in BotApiVersionRange<'6.1', BotApiPrevVersion<'6.2'>>]: Merge<
    MiniAppV60to61['6.0'],
    { version: version } & MiniAppV61
  >;
}

type MiniAppV62to67 = {
  [version in BotApiVersionRange<'6.2', BotApiPrevVersion<'6.7'>>]: Merge<
    MiniAppV61to62['6.1'],
    { version: version } & MiniAppV62
  >;
}

type MiniAppV67to69 = {
  [version in BotApiVersionRange<'6.7', BotApiPrevVersion<'6.9'>>]: Merge<
    MiniAppV62to67['6.2'],
    { version: version } & MiniAppV67
  >;
}

type MiniAppV69to78 = {
  [version in BotApiVersionRange<'6.9', BotApiPrevVersion<'7.8'>>]: Merge<
    MiniAppV67to69['6.7'],
    { version: version } & MiniAppV69
  >;
}

type MiniAppV78to80 = {
  [version in BotApiVersionRange<'7.8', BotApiPrevVersion<'8.0'>>]: Merge<
    MiniAppV69to78['6.9'],
    { version: version } & MiniAppV78
  >;
}

type MiniAppV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    MiniAppV78to80['7.8'],
    { version: version } & MiniAppV80
  >;
}

type MiniApp =
  & MiniAppV60to61
  & MiniAppV61to62
  & MiniAppV62to67
  & MiniAppV67to69
  & MiniAppV69to78
  & MiniAppV78to80
  & MiniAppV80toLatest

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

  const openInvoiceAsync = promisify(webApp.openInvoice)

  function openInvoice(url: string): ReturnType<typeof openInvoiceAsync>
  function openInvoice(url: string, callback?: WebAppCallback['openInvoice']): void
  function openInvoice(url: string, callback?: WebAppCallback['openInvoice']): ReturnType<typeof openInvoiceAsync> | void {
    if (callback)
      webApp.openInvoice(url, callback)
    else
      return openInvoiceAsync(url)
  }

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

  const requestContactAsync = promisify(webApp.requestContact)

  function requestContact(): ReturnType<typeof requestContactAsync>
  function requestContact(callback?: WebAppCallback['requestContact']): void
  function requestContact(callback?: WebAppCallback['requestContact']): ReturnType<typeof requestContactAsync> | void {
    if (callback)
      webApp.requestContact(callback)
    else
      return requestContactAsync()
  }

  const requestWriteAccessAsync = promisify(webApp.requestWriteAccess)

  function requestWriteAccess(): ReturnType<typeof requestWriteAccessAsync>
  function requestWriteAccess(callback?: WebAppCallback['requestWriteAccess']): void
  function requestWriteAccess(callback?: WebAppCallback['requestWriteAccess']): ReturnType<typeof requestWriteAccessAsync> | void {
    if (callback)
      webApp.requestWriteAccess(callback)
    else
      return requestWriteAccessAsync()
  }

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

  const shareMessageAsync = promisify(webApp.shareMessage)

  function shareMessage(msg_id: string): ReturnType<typeof shareMessageAsync>
  function shareMessage(msg_id: string, callback?: WebAppCallback['shareMessage']): void
  function shareMessage(msg_id: string, callback?: WebAppCallback['shareMessage']): ReturnType<typeof shareMessageAsync> | void {
    if (callback)
      webApp.shareMessage(msg_id, callback)
    else
      return shareMessageAsync(msg_id)
  }

  const downloadFileAsync = promisify(webApp.downloadFile)

  function downloadFile(params: DownloadFileParams): ReturnType<typeof downloadFileAsync>
  function downloadFile(params: DownloadFileParams, callback?: WebAppCallback['downloadFile']): void
  function downloadFile(params: DownloadFileParams, callback?: WebAppCallback['downloadFile']): ReturnType<typeof downloadFileAsync> | void {
    if (callback)
      webApp.downloadFile(params, callback)
    else
      return downloadFileAsync(params)
  }

  onActivated(updateState)
  onDeactivated(updateState)

  return {
    shareMessage,
    downloadFile,
    onActive: onActivated,
    onDeactive: onDeactivated,
    onShareMessageSent,
    onShareMessageFail: onShareMessageFailed,
    onFileDownloadRequest: onFileDownloadRequested,
  }
}

export function useMiniApp<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useMiniApp60(),
    ...(isVersionGreaterOrEqual(version, '6.1') && useMiniApp61()),
    ...(isVersionGreaterOrEqual(version, '6.2') && useMiniApp62()),
    ...(isVersionGreaterOrEqual(version, '6.7') && useMiniApp67()),
    ...(isVersionGreaterOrEqual(version, '6.9') && useMiniApp69()),
    ...(isVersionGreaterOrEqual(version, '7.8') && useMiniApp78()),
    ...(isVersionGreaterOrEqual(version, '8.0') && useMiniApp80()),
  } as VersionedReturnType<MiniApp, Version, '6.1' | '6.2' | '6.7' | '6.9' | '7.8' | '8.0'>
}

export function isVersionAtLeast(version: BotApiVersion) {
  return isVersionGreaterOrEqual(version, getWebApp().version)
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
    | 'unigram',
) {
  return getWebApp().platform === name
}

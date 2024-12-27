import type { WebAppCallback } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { onClipboardTextReceived } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual, promisify } from '../utils'

type ClipboardV64 = ReturnType<typeof useClipboard64>

type ClipboardV60to64 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.4'>>]: Merge<
    Partial<ClipboardV64>,
    { version: version }
  >;
}

type ClipboardV64toLatest = {
  [version in BotApiVersionRange<'6.4', LATEST_VERSION>]: Merge<
    ClipboardV60to64['6.0'],
    { version: version } & ClipboardV64
  >;
}

type Clipboard =
  & ClipboardV60to64
  & ClipboardV64toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useClipboard64() {
  const {
    webApp,
  } = useStore()

  const readTextFromClipboardAsync = promisify(webApp.readTextFromClipboard)

  function readTextFromClipboard(): ReturnType<typeof readTextFromClipboardAsync>
  function readTextFromClipboard(callback?: WebAppCallback['readTextFromClipboard']): void
  function readTextFromClipboard(callback?: WebAppCallback['readTextFromClipboard']): ReturnType<typeof readTextFromClipboardAsync> | void {
    if (callback)
      webApp.readTextFromClipboard(callback)
    else
      return readTextFromClipboardAsync()
  }

  return {
    readText: readTextFromClipboard,
    onReadText: onClipboardTextReceived,
  }
}

export function useClipboard<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...(isVersionGreaterOrEqual(version, '6.4')
      ? useClipboard64()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<Clipboard, Version, '6.4'>
}

import type { WebAppCallback } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { onClipboardTextReceived } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type v64 = ReturnType<typeof useClipboard64>

export type Schema = {
  '6.0': Merge<Partial<v64>, object>
  '6.4': Merge<Schema['6.0'], v64>
}

export type Clipboard =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.4'>> })
  | (Schema['6.4'] & { version: BotApiVersionRange<'6.4', LATEST_VERSION> })

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

export function useClipboard<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.4') && useClipboard64()),
  } as VersionedReturnType<Clipboard, Version, keyof Schema>
}

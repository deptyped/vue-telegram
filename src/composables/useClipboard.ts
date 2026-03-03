import type { WebAppCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { onClipboardTextReceived } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v64 = ReturnType<typeof useClipboard64>
type AllFeatures = v64

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '6.4': Merge<Schema['6.0'], v64>
}

export type Clipboard
  = | SinceUntil<Schema, '6.0', '6.4'>
    | SinceLatest<Schema, '6.4'>

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

  const readTextFromClipboard = createCallbackOrPromiseMethod(
    (callback: WebAppCallback['readTextFromClipboard']) => webApp.readTextFromClipboard(callback),
    promisify,
  )

  return {
    readText: readTextFromClipboard,
    onReadText: onClipboardTextReceived,
  }
}

export function useClipboard<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<Clipboard, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '6.4', use: useClipboard64 },
    ],
  )
}

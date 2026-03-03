import type { EmojiStatusParams, WebAppCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { onEmojiStatusAccessRequested, onEmojiStatusFailed, onEmojiStatusSet } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v80 = ReturnType<typeof useEmojiStatus80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '8.0': Merge<Schema['6.0'], v80>
}

export type EmojiStatus
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useEmojiStatus80() {
  const {
    webApp,
  } = useStore()

  const setEmojiStatus = createCallbackOrPromiseMethod(
    (custom_emoji_id: string, params: EmojiStatusParams, callback: WebAppCallback['setEmojiStatus']) =>
      webApp.setEmojiStatus(custom_emoji_id, params, callback),
    promisify,
  )
  const requestEmojiStatusAccess = createCallbackOrPromiseMethod(
    (callback: WebAppCallback['requestEmojiStatusAccess']) => webApp.requestEmojiStatusAccess(callback),
    promisify,
  )

  return {
    set: setEmojiStatus,
    requestAccess: requestEmojiStatusAccess,
    onSet: onEmojiStatusSet,
    onFail: onEmojiStatusFailed,
    onAccessRequest: onEmojiStatusAccessRequested,
  }
}

export function useEmojiStatus<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<EmojiStatus, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '8.0', use: useEmojiStatus80 },
    ],
  )
}

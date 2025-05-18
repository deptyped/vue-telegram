import type { EmojiStatusParams, WebAppCallback } from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { onEmojiStatusAccessRequested, onEmojiStatusFailed, onEmojiStatusSet } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type v80 = ReturnType<typeof useEmojiStatus80>

export type Schema = {
  '6.0': Merge<Partial<v80>, object>
  '8.0': Merge<Schema['6.0'], v80>
}

export type EmojiStatus =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>> })
  | (Schema['8.0'] & { version: BotApiVersionRange<'8.0', LATEST_VERSION> })

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

  const setEmojiStatusAsync = promisify(webApp.setEmojiStatus)

  function setEmojiStatus(custom_emoji_id: string, params: EmojiStatusParams): ReturnType<typeof setEmojiStatusAsync>
  function setEmojiStatus(custom_emoji_id: string, params: EmojiStatusParams, callback?: WebAppCallback['setEmojiStatus']): void
  function setEmojiStatus(custom_emoji_id: string, params: EmojiStatusParams, callback?: WebAppCallback['setEmojiStatus']): ReturnType<typeof setEmojiStatusAsync> | void {
    if (callback)
      webApp.setEmojiStatus(custom_emoji_id, params, callback)
    else
      return setEmojiStatusAsync(custom_emoji_id, params)
  }

  const requestEmojiStatusAccessAsync = promisify(webApp.requestEmojiStatusAccess)

  function requestEmojiStatusAccess(): ReturnType<typeof requestEmojiStatusAccessAsync>
  function requestEmojiStatusAccess(callback?: WebAppCallback['requestEmojiStatusAccess']): void
  function requestEmojiStatusAccess(callback?: WebAppCallback['requestEmojiStatusAccess']): ReturnType<typeof requestEmojiStatusAccessAsync> | void {
    if (callback)
      webApp.requestEmojiStatusAccess(callback)
    else
      return requestEmojiStatusAccessAsync()
  }

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
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '8.0') && useEmojiStatus80()),
  } as VersionedReturnType<EmojiStatus, Version, keyof Schema>
}

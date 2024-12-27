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
import { defineStore, isVersionGreaterOrEqual, promisify } from '../utils'

type EmojiStatusV80 = ReturnType<typeof useEmojiStatus80>

type EmojiStatusV60to80 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>>]: Merge<
    Partial<EmojiStatusV80>,
    { version: version }
  >;
}

type EmojiStatusV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    EmojiStatusV60to80['6.0'],
    { version: version } & EmojiStatusV80
  >;
}

type EmojiStatus =
  & EmojiStatusV60to80
  & EmojiStatusV80toLatest

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

export function useEmojiStatus<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...(isVersionGreaterOrEqual(version, '8.0')
      ? useEmojiStatus80()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<EmojiStatus, Version, '8.0'>
}

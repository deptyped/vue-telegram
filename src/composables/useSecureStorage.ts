import type { SecureStorageCallback } from '../sdk/secure-storage'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, promisifyWithError } from '../utils'

type SecureStorageV90 = ReturnType<typeof useSecureStorage90>

type SecureStorageV60to90 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'9.0'>>]: Merge<
    Partial<SecureStorageV90>,
    { version: version }
  >;
}

type SecureStorageV90toLatest = {
  [version in BotApiVersionRange<'9.0', LATEST_VERSION>]: Merge<
    SecureStorageV60to90['6.0'],
    { version: version } & SecureStorageV90
  >;
}

type SecureStorage =
  & SecureStorageV60to90
  & SecureStorageV90toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useSecureStorage90() {
  const {
    webApp,
  } = useStore()

  const setItemAsync = promisifyWithError(webApp.SecureStorage.setItem)

  function setItem(key: string, value: string): ReturnType<typeof setItemAsync>
  function setItem(key: string, value: string, callback?: SecureStorageCallback['setItem']): void
  function setItem(key: string, value: string, callback?: SecureStorageCallback['setItem']): ReturnType<typeof setItemAsync> | void {
    if (callback)
      webApp.SecureStorage.setItem(key, value, callback)
    else
      return setItemAsync(key, value)
  }

  const getItemAsync = promisifyWithError(webApp.SecureStorage.getItem)

  function getItem(key: string): ReturnType<typeof getItemAsync>
  function getItem(key: string, callback?: SecureStorageCallback['getItem']): void
  function getItem(key: string, callback?: SecureStorageCallback['getItem']): ReturnType<typeof getItemAsync> | void {
    if (callback)
      webApp.SecureStorage.getItem(key, callback)
    else
      return getItemAsync(key)
  }

  const restoreItemAsync = promisifyWithError(webApp.SecureStorage.restoreItem)

  function restoreItem(key: string): ReturnType<typeof restoreItemAsync>
  function restoreItem(key: string, callback?: SecureStorageCallback['restoreItem']): void
  function restoreItem(key: string, callback?: SecureStorageCallback['restoreItem']): ReturnType<typeof restoreItemAsync> | void {
    if (callback)
      webApp.SecureStorage.restoreItem(key, callback)
    else
      return restoreItemAsync(key)
  }

  const removeItemAsync = promisifyWithError(webApp.SecureStorage.removeItem)

  function removeItem(key: string): ReturnType<typeof removeItemAsync>
  function removeItem(key: string, callback?: SecureStorageCallback['removeItem']): void
  function removeItem(key: string, callback?: SecureStorageCallback['removeItem']): ReturnType<typeof removeItemAsync> | void {
    if (callback)
      webApp.SecureStorage.removeItem(key, callback)
    else
      return removeItemAsync(key)
  }

  const clearAsync = promisify(webApp.SecureStorage.clear)

  function clear(): ReturnType<typeof clearAsync>
  function clear(callback?: SecureStorageCallback['clear']): void
  function clear(callback?: SecureStorageCallback['clear']): ReturnType<typeof clearAsync> | void {
    if (callback)
      webApp.SecureStorage.clear(callback)
    else
      return clearAsync()
  }

  return {
    setItem,
    getItem,
    restoreItem,
    removeItem,
    clear,
  }
}

export function useSecureStorage<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '9.0') && useSecureStorage90()),
  } as VersionedReturnType<SecureStorage, Version, '9.0'>
}

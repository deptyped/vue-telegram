import type { CloudStorageCallback } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisifyWithError } from '../utils'

type v69 = ReturnType<typeof useCloudStorage69>

export type Schema = {
  '6.0': Merge<Partial<v69>, object>
  '6.9': Merge<Schema['6.0'], v69>
}

export type CloudStorage =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.9'>> })
  | (Schema['6.9'] & { version: BotApiVersionRange<'6.9', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useCloudStorage69() {
  const {
    webApp,
  } = useStore()

  const setItemAsync = promisifyWithError(webApp.CloudStorage.setItem)

  function setItem(key: string, value: string): ReturnType<typeof setItemAsync>
  function setItem(key: string, value: string, callback?: CloudStorageCallback['setItem']): void
  function setItem(key: string, value: string, callback?: CloudStorageCallback['setItem']): ReturnType<typeof setItemAsync> | void {
    if (callback)
      webApp.CloudStorage.setItem(key, value, callback)
    else
      return setItemAsync(key, value)
  }

  const getItemAsync = promisifyWithError(webApp.CloudStorage.getItem)

  function getItem(key: string): ReturnType<typeof getItemAsync>
  function getItem(key: string, callback?: CloudStorageCallback['getItem']): void
  function getItem(key: string, callback?: CloudStorageCallback['getItem']): ReturnType<typeof getItemAsync> | void {
    if (callback)
      webApp.CloudStorage.getItem(key, callback)
    else
      return getItemAsync(key)
  }

  const getItemsAsync = promisifyWithError(webApp.CloudStorage.getItems)

  function getItems(keys: string[]): ReturnType<typeof getItemsAsync>
  function getItems(keys: string[], callback?: CloudStorageCallback['getItems']): void
  function getItems(keys: string[], callback?: CloudStorageCallback['getItems']): ReturnType<typeof getItemsAsync> | void {
    if (callback)
      webApp.CloudStorage.getItems(keys, callback)
    else
      return getItemsAsync(keys)
  }

  const removeItemAsync = promisifyWithError(webApp.CloudStorage.removeItem)

  function removeItem(key: string): ReturnType<typeof removeItemAsync>
  function removeItem(key: string, callback?: CloudStorageCallback['removeItem']): void
  function removeItem(key: string, callback?: CloudStorageCallback['removeItem']): ReturnType<typeof removeItemAsync> | void {
    if (callback)
      webApp.CloudStorage.removeItem(key, callback)
    else
      return removeItemAsync(key)
  }

  const removeItemsAsync = promisifyWithError(webApp.CloudStorage.removeItems)

  function removeItems(keys: string[]): ReturnType<typeof removeItemsAsync>
  function removeItems(keys: string[], callback?: CloudStorageCallback['removeItems']): void
  function removeItems(keys: string[], callback?: CloudStorageCallback['removeItems']): ReturnType<typeof removeItemsAsync> | void {
    if (callback)
      webApp.CloudStorage.removeItems(keys, callback)
    else
      return removeItemsAsync(keys)
  }

  const getKeysAsync = promisifyWithError(webApp.CloudStorage.getKeys)

  function getKeys(): ReturnType<typeof getKeysAsync>
  function getKeys(callback?: CloudStorageCallback['getKeys']): void
  function getKeys(callback?: CloudStorageCallback['getKeys']): ReturnType<typeof getKeysAsync> | void {
    if (callback)
      webApp.CloudStorage.getKeys(callback)
    else
      return getKeysAsync()
  }

  return {
    setItem,
    getItem,
    getItems,
    removeItem,
    removeItems,
    getKeys,
  }
}

export function useCloudStorage<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.9') && useCloudStorage69()),
  } as VersionedReturnType<CloudStorage, Version, keyof Schema>
}

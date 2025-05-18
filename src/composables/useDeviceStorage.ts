import type { DeviceStorageCallback } from '../sdk/device-storage'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, promisifyWithError } from '../utils'

type v90 = ReturnType<typeof useDeviceStorage90>

export type Schema = {
  '6.0': Merge<Partial<v90>, object>
  '9.0': Merge<Schema['6.0'], v90>
}

export type DeviceStorage =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'9.0'>> })
  | (Schema['9.0'] & { version: BotApiVersionRange<'9.0', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useDeviceStorage90() {
  const {
    webApp,
  } = useStore()

  const setItemAsync = promisifyWithError(webApp.DeviceStorage.setItem)

  function setItem(key: string, value: string): ReturnType<typeof setItemAsync>
  function setItem(key: string, value: string, callback?: DeviceStorageCallback['setItem']): void
  function setItem(key: string, value: string, callback?: DeviceStorageCallback['setItem']): ReturnType<typeof setItemAsync> | void {
    if (callback)
      webApp.DeviceStorage.setItem(key, value, callback)
    else
      return setItemAsync(key, value)
  }

  const getItemAsync = promisifyWithError(webApp.DeviceStorage.getItem)

  function getItem(key: string): ReturnType<typeof getItemAsync>
  function getItem(key: string, callback?: DeviceStorageCallback['getItem']): void
  function getItem(key: string, callback?: DeviceStorageCallback['getItem']): ReturnType<typeof getItemAsync> | void {
    if (callback)
      webApp.DeviceStorage.getItem(key, callback)
    else
      return getItemAsync(key)
  }

  const removeItemAsync = promisifyWithError(webApp.DeviceStorage.removeItem)

  function removeItem(key: string): ReturnType<typeof removeItemAsync>
  function removeItem(key: string, callback?: DeviceStorageCallback['removeItem']): void
  function removeItem(key: string, callback?: DeviceStorageCallback['removeItem']): ReturnType<typeof removeItemAsync> | void {
    if (callback)
      webApp.DeviceStorage.removeItem(key, callback)
    else
      return removeItemAsync(key)
  }

  const clearAsync = promisify(webApp.DeviceStorage.clear)

  function clear(): ReturnType<typeof clearAsync>
  function clear(callback?: DeviceStorageCallback['clear']): void
  function clear(callback?: DeviceStorageCallback['clear']): ReturnType<typeof clearAsync> | void {
    if (callback)
      webApp.DeviceStorage.clear(callback)
    else
      return clearAsync()
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}

export function useDeviceStorage<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '9.0') && useDeviceStorage90()),
  } as VersionedReturnType<DeviceStorage, Version, keyof Schema>
}

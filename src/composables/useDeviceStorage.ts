import type { DeviceStorageCallback } from '../sdk/device-storage'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify, promisifyWithError } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v90 = ReturnType<typeof useDeviceStorage90>
type AllFeatures = v90

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '9.0': Merge<Schema['6.0'], v90>
}

export type DeviceStorage
  = | SinceUntil<Schema, '6.0', '9.0'>
    | SinceLatest<Schema, '9.0'>

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

  const setItem = createCallbackOrPromiseMethod(
    (key: string, value: string, callback: DeviceStorageCallback['setItem']) => webApp.DeviceStorage.setItem(key, value, callback),
    promisifyWithError,
  )
  const getItem = createCallbackOrPromiseMethod(
    (key: string, callback: DeviceStorageCallback['getItem']) => webApp.DeviceStorage.getItem(key, callback),
    promisifyWithError,
  )
  const removeItem = createCallbackOrPromiseMethod(
    (key: string, callback: DeviceStorageCallback['removeItem']) => webApp.DeviceStorage.removeItem(key, callback),
    promisifyWithError,
  )
  const clear = createCallbackOrPromiseMethod(
    (callback: DeviceStorageCallback['clear']) => webApp.DeviceStorage.clear(callback),
    promisify,
  )

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}

export function useDeviceStorage<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<DeviceStorage, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '9.0', use: useDeviceStorage90 },
    ],
  )
}

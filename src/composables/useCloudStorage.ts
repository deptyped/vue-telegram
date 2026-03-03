import type { CloudStorageCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisifyWithError } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v69 = ReturnType<typeof useCloudStorage69>
type AllFeatures = v69

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '6.9': Merge<Schema['6.0'], v69>
}

export type CloudStorage
  = | SinceUntil<Schema, '6.0', '6.9'>
    | SinceLatest<Schema, '6.9'>

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

  const setItem = createCallbackOrPromiseMethod(
    (key: string, value: string, callback: CloudStorageCallback['setItem']) => webApp.CloudStorage.setItem(key, value, callback),
    promisifyWithError,
  )
  const getItem = createCallbackOrPromiseMethod(
    (key: string, callback: CloudStorageCallback['getItem']) => webApp.CloudStorage.getItem(key, callback),
    promisifyWithError,
  )
  const getItems = createCallbackOrPromiseMethod(
    (keys: string[], callback: CloudStorageCallback['getItems']) => webApp.CloudStorage.getItems(keys, callback),
    promisifyWithError,
  )
  const removeItem = createCallbackOrPromiseMethod(
    (key: string, callback: CloudStorageCallback['removeItem']) => webApp.CloudStorage.removeItem(key, callback),
    promisifyWithError,
  )
  const removeItems = createCallbackOrPromiseMethod(
    (keys: string[], callback: CloudStorageCallback['removeItems']) => webApp.CloudStorage.removeItems(keys, callback),
    promisifyWithError,
  )
  const getKeys = createCallbackOrPromiseMethod(
    (callback: CloudStorageCallback['getKeys']) => webApp.CloudStorage.getKeys(callback),
    promisifyWithError,
  )

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
  return createVersionedComposable<CloudStorage, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '6.9', use: useCloudStorage69 },
    ],
  )
}

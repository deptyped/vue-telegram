import type { SecureStorageCallback } from '../sdk/secure-storage'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify, promisifyWithError } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v90 = ReturnType<typeof useSecureStorage90>
type AllFeatures = v90

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '9.0': Merge<Schema['6.0'], v90>
}

export type SecureStorage
  = | SinceUntil<Schema, '6.0', '9.0'>
    | SinceLatest<Schema, '9.0'>

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

  const setItem = createCallbackOrPromiseMethod(
    (key: string, value: string, callback: SecureStorageCallback['setItem']) => webApp.SecureStorage.setItem(key, value, callback),
    promisifyWithError,
  )
  const getItem = createCallbackOrPromiseMethod(
    (key: string, callback: SecureStorageCallback['getItem']) => webApp.SecureStorage.getItem(key, callback),
    promisifyWithError,
  )
  const restoreItem = createCallbackOrPromiseMethod(
    (key: string, callback: SecureStorageCallback['restoreItem']) => webApp.SecureStorage.restoreItem(key, callback),
    promisifyWithError,
  )
  const removeItem = createCallbackOrPromiseMethod(
    (key: string, callback: SecureStorageCallback['removeItem']) => webApp.SecureStorage.removeItem(key, callback),
    promisifyWithError,
  )
  const clear = createCallbackOrPromiseMethod(
    (callback: SecureStorageCallback['clear']) => webApp.SecureStorage.clear(callback),
    promisify,
  )

  return {
    setItem,
    getItem,
    restoreItem,
    removeItem,
    clear,
  }
}

export function useSecureStorage<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<SecureStorage, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '9.0', use: useSecureStorage90 },
    ],
  )
}

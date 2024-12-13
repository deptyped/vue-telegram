import { WebApp } from '../sdk'

type SetItemResult = Parameters<
  NonNullable<
    NonNullable<Parameters<typeof WebApp.CloudStorage.setItem>>[2]
  >
>[1]

function setStorageItem(key: string, value: string) {
  return new Promise<SetItemResult>((resolve, reject) => {
    WebApp.CloudStorage.setItem(key, value, (error, ok) => {
      if (error)
        reject(error)

      resolve(ok)
    })
  })
}

type GetItemResult = Parameters<
  NonNullable<
    NonNullable<Parameters<typeof WebApp.CloudStorage.getItem>>[1]
  >
>[1]

function getStorageItem(key: string) {
  return new Promise<GetItemResult>((resolve, reject) => {
    WebApp.CloudStorage.getItem(key, (error, value) => {
      if (error)
        reject(error)

      resolve(value)
    })
  })
}

type GetItemsResult = NonNullable<
  Parameters<
    NonNullable<
      NonNullable<Parameters<typeof WebApp.CloudStorage.getItems>>[1]
    >
  >[1]
>

function getStorageItems(keys: string[]) {
  return new Promise<GetItemsResult>((resolve, reject) => {
    WebApp.CloudStorage.getItems(keys, (error, values) => {
      if (error)
        reject(error)

      resolve(values as GetItemsResult)
    })
  })
}

type RemoveItemResult = Parameters<
  NonNullable<
    NonNullable<Parameters<typeof WebApp.CloudStorage.removeItem>>[1]
  >
>[1]

function removeStorageItem(key: string) {
  return new Promise<RemoveItemResult>((resolve, reject) => {
    WebApp.CloudStorage.removeItem(key, (error, ok) => {
      if (error)
        reject(error)

      resolve(ok)
    })
  })
}

type RemoveItemsResult = Parameters<
  NonNullable<
    NonNullable<Parameters<typeof WebApp.CloudStorage.removeItems>>[1]
  >
>[1]

function removeStorageItems(keys: string[]) {
  return new Promise<RemoveItemsResult>((resolve, reject) => {
    WebApp.CloudStorage.removeItems(keys, (error, ok) => {
      if (error)
        reject(error)

      resolve(ok)
    })
  })
}

type GetKeysResult = NonNullable<
  Parameters<
    NonNullable<
      NonNullable<Parameters<typeof WebApp.CloudStorage.getKeys>>[0]
    >
  >[1]
>

function getStorageKeys() {
  return new Promise<GetKeysResult>((resolve, reject) => {
    WebApp.CloudStorage.getKeys((error, values) => {
      if (error)
        reject(error)

      resolve(values as GetKeysResult)
    })
  })
}

/**
 * @deprecated Use [`useCloudStorage`](https://vue-tg.deptyped.com/mini-apps.html#usecloudstorage) instead
 */
export function useWebAppCloudStorage() {
  return {
    setStorageItem,
    getStorageItem,
    getStorageItems,
    removeStorageItem,
    removeStorageItems,
    getStorageKeys,
  }
}

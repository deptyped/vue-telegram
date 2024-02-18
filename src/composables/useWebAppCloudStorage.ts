const CloudStorage = Telegram.WebApp.CloudStorage

type SetItemResult = Parameters<
  NonNullable<NonNullable<Parameters<typeof CloudStorage.setItem>>[2]>
>[1]

function setStorageItem(key: string, value: string) {
  return new Promise<SetItemResult>((resolve, reject) => {
    CloudStorage.setItem(key, value, (error, ok) => {
      if (error) reject(error)

      resolve(ok)
    })
  })
}

type GetItemResult = Parameters<
  NonNullable<NonNullable<Parameters<typeof CloudStorage.getItem>>[1]>
>[1]

function getStorageItem(key: string) {
  return new Promise<GetItemResult>((resolve, reject) => {
    CloudStorage.getItem(key, (error, value) => {
      if (error) reject(error)

      resolve(value)
    })
  })
}

type GetItemsResult = NonNullable<
  Parameters<
    NonNullable<NonNullable<Parameters<typeof CloudStorage.getItems>>[1]>
  >[1]
>

function getStorageItems(keys: string[]) {
  return new Promise<GetItemsResult>((resolve, reject) => {
    CloudStorage.getItems(keys, (error, values) => {
      if (error) reject(error)

      resolve(values as GetItemsResult)
    })
  })
}

type RemoveItemResult = Parameters<
  NonNullable<NonNullable<Parameters<typeof CloudStorage.removeItem>>[1]>
>[1]

function removeStorageItem(key: string) {
  return new Promise<RemoveItemResult>((resolve, reject) => {
    CloudStorage.removeItem(key, (error, ok) => {
      if (error) reject(error)

      resolve(ok)
    })
  })
}

type RemoveItemsResult = Parameters<
  NonNullable<NonNullable<Parameters<typeof CloudStorage.removeItems>>[1]>
>[1]

function removeStorageItems(keys: string[]) {
  return new Promise<RemoveItemsResult>((resolve, reject) => {
    CloudStorage.removeItems(keys, (error, ok) => {
      if (error) reject(error)

      resolve(ok)
    })
  })
}

type GetKeysResult = NonNullable<
  Parameters<
    NonNullable<NonNullable<Parameters<typeof CloudStorage.getKeys>>[0]>
  >[1]
>

function getStorageKeys() {
  return new Promise<GetKeysResult>((resolve, reject) => {
    CloudStorage.getKeys((error, values) => {
      if (error) reject(error)

      resolve(values as GetKeysResult)
    })
  })
}

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

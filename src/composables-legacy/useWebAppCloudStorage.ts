import { useCloudStorage } from '../composables/useCloudStorage'

/**
 * @deprecated Use [`useCloudStorage`](https://vue-tg.deptyped.com/mini-apps.html#usecloudstorage) instead
 */
export function useWebAppCloudStorage() {
  const cloudStorage = useCloudStorage({ version: '8.0' })

  return {
    setStorageItem: cloudStorage.setItem,
    getStorageItem: cloudStorage.getItem,
    getStorageItems: cloudStorage.getItems,
    removeStorageItem: cloudStorage.removeItem,
    removeStorageItems: cloudStorage.removeItems,
    getStorageKeys: cloudStorage.getKeys,
  }
}

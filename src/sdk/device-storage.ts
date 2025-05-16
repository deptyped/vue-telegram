export type DeviceStorage = {
  setItem: (key: string, value: string, callback?: DeviceStorageCallback['setItem']) => DeviceStorage
  getItem: (key: string, callback: DeviceStorageCallback['getItem']) => DeviceStorage
  removeItem: (key: string, callback?: DeviceStorageCallback['removeItem']) => DeviceStorage
  clear: (callback: DeviceStorageCallback['clear']) => DeviceStorage
}

export type DeviceStorageCallback = {
  setItem: (error: string | null, success: null | true) => void
  getItem: (error: string | null, value: null | string) => void
  removeItem: (error: string | null, success: null | true) => void
  clear: (error: string | null) => void
}

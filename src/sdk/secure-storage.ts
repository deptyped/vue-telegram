export type SecureStorage = {
  setItem: (key: string, value: string, callback?: SecureStorageCallback['setItem']) => SecureStorage
  getItem: (key: string, callback: SecureStorageCallback['getItem']) => SecureStorage
  restoreItem: (key: string, callback?: SecureStorageCallback['restoreItem']) => SecureStorage
  removeItem: (key: string, callback?: SecureStorageCallback['removeItem']) => SecureStorage
  clear: (callback: SecureStorageCallback['clear']) => SecureStorage
}

export type SecureStorageCallback = {
  setItem: (error: string | null, success: null | true) => void
  getItem: (error: string | null, value: null | string) => void
  restoreItem: (error: string | null, value: null | string) => void
  removeItem: (error: string | null, success: null | true) => void
  clear: (error: string | null) => void
}

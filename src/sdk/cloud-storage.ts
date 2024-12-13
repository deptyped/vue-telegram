export type CloudStorage = {
  setItem: (key: string, value: string, callback?: CloudStorageCallback['setItem']) => CloudStorage
  getItem: (key: string, callback: CloudStorageCallback['getItem']) => CloudStorage
  getItems: (keys: string[], callback: CloudStorageCallback['getItems']) => CloudStorage
  removeItem: (key: string, callback?: CloudStorageCallback['removeItem']) => CloudStorage
  removeItems: (keys: string[], callback?: CloudStorageCallback['removeItems']) => CloudStorage
  getKeys: (callback: CloudStorageCallback['getKeys']) => CloudStorage
}

export type CloudStorageCallback = {
  setItem: (error: string | null, success: null | true) => void
  getItem: (error: string | null, value: null | string) => void
  getItems: (error: string | null, values: null | Record<string, string>) => void
  removeItem: (error: string | null, success: null | true) => void
  removeItems: (error: string | null, success: null | true) => void
  getKeys: (error: string | null, keys: null | string[]) => void
}

### useWebAppCloudStorage

```ts
import { useWebAppCloudStorage } from 'vue-tg'
```

▸ **useWebAppCloudStorage**(): `Object`

#### Returns

| Name                 | Type                                                    |
| :------------------- | :------------------------------------------------------ |
| `getStorageItem`     | `(key: string) => Promise<null \| string>`              |
| `getStorageItems`    | `(keys: string[]) => Promise<Record<string, string>>`   |
| `getStorageKeys`     | `() => Promise<string[]>`                               |
| `removeStorageItem`  | `(key: string) => Promise<null \| true>`                |
| `removeStorageItems` | `(keys: string[]) => Promise<null \| true>`             |
| `setStorageItem`     | `(key: string, value: string) => Promise<null \| true>` |

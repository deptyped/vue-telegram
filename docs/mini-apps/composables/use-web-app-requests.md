### useWebAppRequests

```ts
import { useWebAppRequests } from 'vue-tg'
```

▸ **useWebAppRequests**(): `Object`

#### Returns

| Name                     | Type                                                                                           |
| :----------------------- | :--------------------------------------------------------------------------------------------- |
| `onContactRequested`     | `(eventHandler:`[`OnContactRequestedCallback`](#oncontactrequestedcallback)`) => void`         |
| `onWriteAccessRequested` | `(eventHandler:`[`OnWriteAccessRequestedCallback`](#onwriteaccessrequestedcallback)`) => void` |
| `requestContact`         | `(callback?: (success: boolean) => void) => void`                                              |
| `requestWriteAccess`     | `(callback?: (success: boolean) => void) => void`                                              |

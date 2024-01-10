### useWebAppSendData <Badge type="tip" text="custom" />

Useful composable for universal data sending. `execute` just calls `sendData`
and `executeHttp` sends an HTTP POST request to the specified URL.\
Use `canSendData` from [useWebApp](#usewebapp) to check that sending data in a
service message (using `execute`) is available.

```ts
import { useWebAppSendData } from 'vue-tg'
```

▸ **useWebAppSendData**<`D`\>(`data`, `options`): `Object`

#### Parameters

| Name      | Type                                  |
| :-------- | :------------------------------------ |
| `data`    | `D`                                   |
| `options` | `{ serialize?: (data: D) => string }` |

#### Returns

| Name          | Type                                                                   |
| :------------ | :--------------------------------------------------------------------- |
| `error`       | `Ref<string>`                                                          |
| `execute`     | `() => void`                                                           |
| `executeHttp` | `(callbackUrl: string, { closeAfter?: boolean }) => Promise<Response>` |

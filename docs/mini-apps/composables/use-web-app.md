### useWebApp

```ts
import { useWebApp } from 'vue-tg'
```

▸ **useWebApp**(): `Object`

#### Returns

| Name                                                    | Type                                                                                        |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| `close`                                                 | `() => void`                                                                                |
| `initData`                                              | `string`                                                                                    |
| `initDataUnsafe`                                        | [WebAppInitData ↗](https://core.telegram.org/bots/webapps#webappinitdata)                   |
| `isVersionAtLeast`                                      | `(version: string) => boolean`                                                              |
| `onEvent`                                               | [Available Events ↗](https://core.telegram.org/bots/webapps#events-available-for-mini-apps) |
| `platform`                                              | `string`                                                                                    |
| `ready`                                                 | `() => void`                                                                                |
| `sendData`                                              | `(data: string) => void`                                                                    |
| `version`                                               | `string`                                                                                    |
| `isReady` <Badge type="tip" text="custom" />            | `Readonly<Ref<boolean>>`                                                                    |
| `isPlatform` <Badge type="tip" text="custom" />         | `(name: string) => boolean`                                                                 |
| `isPlatformUnknown` <Badge type="tip" text="custom" />  | `boolean`                                                                                   |
| `isPlatformAndroid` <Badge type="tip" text="custom" />  | `boolean`                                                                                   |
| `isPlatformAndroidX` <Badge type="tip" text="custom" /> | `boolean`                                                                                   |
| `isPlatformIOS` <Badge type="tip" text="custom" />      | `boolean`                                                                                   |
| `isPlatformMacOS` <Badge type="tip" text="custom" />    | `boolean`                                                                                   |
| `isPlatformTDesktop` <Badge type="tip" text="custom" /> | `boolean`                                                                                   |
| `isPlatformWebA` <Badge type="tip" text="custom" />     | `boolean`                                                                                   |
| `isPlatformWebK` <Badge type="tip" text="custom" />     | `boolean`                                                                                   |
| `isPlatformUnigram` <Badge type="tip" text="custom" />  | `boolean`                                                                                   |
| `canSendData` <Badge type="tip" text="custom" />        | `boolean`                                                                                   |

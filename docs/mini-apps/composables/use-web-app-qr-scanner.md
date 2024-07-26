### useWebAppQrScanner

```ts
import { useWebAppQrScanner } from 'vue-tg'
```

▸ **useWebAppQrScanner**(): `Object`

#### Returns

| Name                  | Type                                                                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `showScanQrPopup`     | `(params:`[`ScanQrPopupParams ↗`](https://core.telegram.org/bots/webapps#scanqrpopupparams)`, callback?: (data: string) => void) => void` |
| `closeScanQrPopup`    | `() => void`                                                                                                                              |
| `onQrTextReceived`    | `(eventHandler:`[`OnQrTextReceivedCallback`](#onqrtextreceivedcallback)`) => void`                                                        |
| `onScanQrPopupClosed` | `(eventHandler: () => void) => void`                                                                                                      |

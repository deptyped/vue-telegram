### useWebAppPopup

```ts
import { useWebAppPopup } from 'vue-tg'
```

▸ **useWebAppPopup**(): `Object`

#### Returns

| Name            | Type                                                                         |
| :-------------- | :--------------------------------------------------------------------------- |
| `onPopupClosed` | `(eventHandler:`[`OnPopupClosedCallback`](#onpopupclosedcallback)`) => void` |
| `showAlert`     | `(message: string, callback?: () => void) => void`                           |
| `showConfirm`   | `(message: string, callback?: (ok: boolean) => void) => void`               |
| `showPopup`     | `(params: PopupParams, callback?: (button_id: string) => void) => void`      |

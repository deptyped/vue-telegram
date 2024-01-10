### useWebAppNavigation

```ts
import { useWebAppNavigation } from 'vue-tg'
```

▸ **useWebAppNavigation**(): `Object`

#### Returns

| Name                | Type                                                                                                             |
| :------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `onInvoiceClosed`   | `(eventHandler:`[`OnInvoiceClosedCallback`](#oninvoiceclosedcallback)`) => void`                                 |
| `openInvoice`       | `(url: string, callback: (url: string, status: "paid" \| "cancelled" \| "failed" \| "pending") => void) => void` |
| `openLink`          | `(url: string, options?: { try_instant_view?: boolean }) => void`                                                |
| `openTelegramLink`  | `(url: string) => void`                                                                                          |
| `switchInlineQuery` | `(query: string, choose_chat_types?: ("users" \| "bots" \| "groups" \| "channels")[]) => void`                   |

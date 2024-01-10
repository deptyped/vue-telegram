### useWebAppHapticFeedback

```ts
import { useWebAppHapticFeedback } from 'vue-tg'
```

▸ **useWebAppHapticFeedback**(): `Object`

#### Returns

| Name                   | Type                                                                         |
| :--------------------- | :--------------------------------------------------------------------------- |
| `impactOccurred`       | `(style: "light" \| "medium" \| "heavy" \| "rigid" \| "soft") => () => void` |
| `notificationOccurred` | `(type: "error" \| "success" \| "warning") => () => void`                    |
| `selectionChanged`     | `() => void`                                                                 |

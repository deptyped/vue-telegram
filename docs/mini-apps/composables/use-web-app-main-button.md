### useWebAppMainButton

```ts
import { useWebAppMainButton } from 'vue-tg'
```

▸ **useWebAppMainButton**(): `Object`

#### Returns

| Name                          | Type                                                                                         |
| :---------------------------- | :------------------------------------------------------------------------------------------- |
| `disableMainButton`           | `() => void`                                                                                 |
| `enableMainButton`            | `() => void`                                                                                 |
| `hideMainButton`              | `() => void`                                                                                 |
| `hideMainButtonProgress`      | `() => void`                                                                                 |
| `isMainButtonActive`          | `Ref<boolean>`                                                                               |
| `isMainButtonProgressVisible` | `Ref<boolean>`                                                                               |
| `isMainButtonVisible`         | `Ref<boolean>`                                                                               |
| `mainButtonColor`             | `Ref<string>`                                                                                |
| `mainButtonText`              | `Ref<string>`                                                                                |
| `mainButtonTextColor`         | `Ref<string>`                                                                                |
| `onMainButtonClicked`         | `(eventHandler: () => void) => void`                                                         |
| `setMainButtonParams`         | `(params:`[MainButtonParams ↗](https://core.telegram.org/bots/webapps#mainbutton)`) => void` |
| `setMainButtonText`           | `(text: string) => void`                                                                     |
| `showMainButton`              | `() => void`                                                                                 |
| `showMainButtonProgress`      | `(leaveActive?: boolean) => void`                                                            |

### useWebAppViewport

```ts
import { useWebAppViewport } from 'vue-tg'
```

▸ **useWebAppViewport**(): `Object`

#### Returns

| Name                   | Type                                                                                 |
| :--------------------- | :----------------------------------------------------------------------------------- |
| `expand`               | `() => void`                                                                         |
| `isExpanded`           | `Readonly<Ref<boolean>>`                                                             |
| `onViewportChanged`    | `(eventHandler:`[`OnViewportChangedCallback`](#onviewportchangedcallback)`) => void` |
| `viewportHeight`       | `Readonly<Ref<number>>`                                                              |
| `viewportStableHeight` | `Readonly<Ref<number>>`                                                              |

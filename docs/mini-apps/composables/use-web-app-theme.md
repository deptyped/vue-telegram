### useWebAppTheme

```ts
import { useWebAppTheme } from 'vue-tg'
```

▸ **useWebAppTheme**(): `Object`

#### Returns

| Name                 | Type                                                                         |
| :------------------- | :--------------------------------------------------------------------------- |
| `backgroundColor`    | `Ref<string>`                                                                |
| `colorScheme`        | `Ref<"light" \| "dark">`                                                     |
| `headerColor`        | `Ref<string>`                                                                |
| `onThemeChanged`     | `(eventHandler: () => void) => void`                                         |
| `setBackgroundColor` | `(color: string) => void`                                                    |
| `setHeaderColor`     | `(color: "bg_color" \| "secondary_bg_color") => void`                        |
| `themeParams`        | `Ref<`[ThemeParams ↗](https://core.telegram.org/bots/webapps#themeparams)`>` |

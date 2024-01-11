### useWebAppTheme

```ts
import { useWebAppTheme } from 'vue-tg'
```

▸ **useWebAppTheme**(): `Object`

#### Returns

| Name                 | Type                                                                                   |
| :------------------- | :------------------------------------------------------------------------------------- |
| `backgroundColor`    | `Ref<string>`                                                                          |
| `colorScheme`        | `Readonly<Ref<"light" \| "dark">>`                                                     |
| `headerColor`        | `Ref<string>`                                                                          |
| `onThemeChanged`     | `(eventHandler: () => void) => void`                                                   |
| `setBackgroundColor` | `(color: string \| "bg_color" \| "secondary_bg_color") => void`                        |
| `setHeaderColor`     | `(color: string \| "bg_color" \| "secondary_bg_color") => void`                        |
| `themeParams`        | `Readonly<Ref<`[ThemeParams ↗](https://core.telegram.org/bots/webapps#themeparams)`>>` |

### useHomeScreen

```ts
import { useHomeScreen } from 'vue-tg'

const homeScreen = useHomeScreen()
```

| Name                  | Type                                                                                                                      |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `addShortcut`         | <!--@include: @/generated/WebApp-addToHomeScreen.md -->                                                                   |
| `onShortcutAdd`       | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onHomeScreenAdded</code>.   |
| `checkShortcutStatus` | <!--@include: @/generated/WebApp-checkHomeScreenStatus.md --><br/><Badge type="info" text="⭐️ async" />                    |
| `onShortcutCheck`     | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onHomeScreenChecked</code>. |
| `version`             | <!--@include: @/generated/WebApp-version.md -->                                                                           |
| `isVersionAtLeast`    | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                  |

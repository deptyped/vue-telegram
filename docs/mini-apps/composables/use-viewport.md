### useViewport

```ts
import { useViewport } from 'vue-tg'

const viewport = useViewport()
```

| Name                      | Description                                                                                                                    |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `isExpanded`              | <!--@include: @/generated/WebApp-isExpanded.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `expand`                  | <!--@include: @/generated/WebApp-expand.md -->                                                                                 |
| `viewportHeight`          | <!--@include: @/generated/WebApp-viewportHeight.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                    |
| `viewportStableHeight`    | <!--@include: @/generated/WebApp-viewportStableHeight.md --><br/><Badge type="info" text="⚡️ readonly reactive" />              |
| `onChange`                | A method that sets event handler. An alias for <code>onViewportChanged</code>.                                                 |
| `isFullscreen`            | <!--@include: @/generated/WebApp-isFullscreen.md --><br/><Badge type="info" text="⚡️ reactive" />                               |
| `onFullscreenChange`      | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onFullscreenChanged</code>.      |
| `onFullscreenFail`        | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onFullscreenFailed</code>.       |
| `isOrientationLocked`     | <!--@include: @/generated/WebApp-isOrientationLocked.md --><br/><Badge type="info" text="⚡️ reactive" />                        |
| `isVerticalSwipesEnabled` | <!--@include: @/generated/WebApp-isVerticalSwipesEnabled.md --><br/><Badge type="info" text="⚡️ reactive" />                    |
| `safeAreaInset`           | <!--@include: @/generated/WebApp-safeAreaInset.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                     |
| `onSafeAreaChange`        | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onSafeAreaChanged</code>.        |
| `contentSafeAreaInset`    | <!--@include: @/generated/WebApp-contentSafeAreaInset.md --><br/><Badge type="info" text="⚡️ readonly reactive" />              |
| `onContentSafeAreaChange` | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onContentSafeAreaChanged</code>. |
| `version`                 | <!--@include: @/generated/WebApp-version.md -->                                                                                |
| `isVersionAtLeast`        | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                       |

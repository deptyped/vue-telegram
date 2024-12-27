### useClipboard

```ts
import { useClipboard } from 'vue-tg'

const clipboard = useClipboard()
```

| Name               | Description                                                                                                                   |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `readText`         | <!--@include: @/generated/WebApp-readTextFromClipboard.md --><br/><Badge type="info" text="⭐️ async" />                        |
| `onReadText`       | <Badge type="tip" text="Bot API 6.4+" /> A method that sets event handler. An alias for <code>onClipboardTextReceived</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                               |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                      |

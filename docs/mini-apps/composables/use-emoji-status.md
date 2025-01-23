### useEmojiStatus

```ts
import { useEmojiStatus } from 'vue-tg'

const emojiStatus = useEmojiStatus()
```

| Name               | Description                                                                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `set`              | <!--@include: @/generated/WebApp-setEmojiStatus.md --><br/><Badge type="info" text="⭐️ async" />                                    |
| `onSet`            | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onEmojiStatusSet</code>.             |
| `onFail`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onEmojiStatusFailed</code>.          |
| `requestAccess`    | <!--@include: @/generated/WebApp-requestEmojiStatusAccess.md --><br/><Badge type="info" text="⭐️ async" />                          |
| `onAccessRequest`  | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onEmojiStatusAccessRequested</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                                    |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                           |

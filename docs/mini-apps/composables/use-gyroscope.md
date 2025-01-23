### useGyroscope

```ts
import { useGyroscope } from 'vue-tg'

const gyroscope = useGyroscope()
```

| Name               | Description                                                                                                              |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `isStarted`        | <!--@include: @/generated/Gyroscope-isStarted.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                |
| `x`                | <!--@include: @/generated/Gyroscope-x.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `y`                | <!--@include: @/generated/Gyroscope-y.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `z`                | <!--@include: @/generated/Gyroscope-z.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `start`            | <!--@include: @/generated/Gyroscope-start.md --><br/><Badge type="info" text="⭐️ async" />                                |
| `onStart`          | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onGyroscopeStarted</code>. |
| `onChange`         | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onGyroscopeChanged</code>. |
| `onFail`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onGyroscopeFailed</code>.  |
| `stop`             | <!--@include: @/generated/Gyroscope-stop.md --><br/><Badge type="info" text="⭐️ async" />                                 |
| `onStop`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onGyroscopeStopped</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                          |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                 |

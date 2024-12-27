### useAccelerometer

```ts
import { useAccelerometer } from 'vue-tg'

const accelerometer = useAccelerometer()
```
 
| Name               | Description                                                                                                                  |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `isStarted`        | <!--@include: @/generated/Accelerometer-isStarted.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                |
| `x`                | <!--@include: @/generated/Accelerometer-x.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `y`                | <!--@include: @/generated/Accelerometer-y.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `z`                | <!--@include: @/generated/Accelerometer-z.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                        |
| `start`            | <!--@include: @/generated/Accelerometer-start.md --><br/><Badge type="info" text="⭐️ async" />                                |
| `onStart`          | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onAccelerometerStarted</code>. |
| `onChange`         | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onAccelerometerChanged</code>. |
| `onFail`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onAccelerometerFailed</code>.  |
| `stop`             | <!--@include: @/generated/Accelerometer-stop.md --><br/><Badge type="info" text="⭐️ async" />                                 |
| `onStop`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onAccelerometerStopped</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                              |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                     |

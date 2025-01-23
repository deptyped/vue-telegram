### useDeviceOrientation

```ts
import { useDeviceOrientation } from 'vue-tg'

const deviceOrientation = useDeviceOrientation()
```

| Name               | Description                                                                                                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `isStarted`        | <!--@include: @/generated/DeviceOrientation-isStarted.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                |
| `absolute`         | <!--@include: @/generated/DeviceOrientation-absolute.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                 |
| `alpha`            | <!--@include: @/generated/DeviceOrientation-alpha.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                    |
| `beta`             | <!--@include: @/generated/DeviceOrientation-beta.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                     |
| `gamma`            | <!--@include: @/generated/DeviceOrientation-gamma.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                    |
| `start`            | <!--@include: @/generated/DeviceOrientation-start.md --><br/><Badge type="info" text="⭐️ async" />                                |
| `onStart`          | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onDeviceOrientationStarted</code>. |
| `onChange`         | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onDeviceOrientationChanged</code>. |
| `onFail`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onDeviceOrientationFailed</code>.  |
| `stop`             | <!--@include: @/generated/DeviceOrientation-stop.md --><br/><Badge type="info" text="⭐️ async" />                                 |
| `onStop`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onDeviceOrientationStopped</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                                  |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                         |

### useLocationManager

```ts
import { useLocationManager } from 'vue-tg'

const locationManager = useLocationManager()
```
 
| Name                  | Description                                                                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `isInited`            | <!--@include: @/generated/LocationManager-isInited.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                 |
| `isLocationAvailable` | <!--@include: @/generated/LocationManager-isLocationAvailable.md --><br/><Badge type="info" text="⚡️ readonly reactive" />      |
| `isAccessRequested`   | <!--@include: @/generated/LocationManager-isAccessRequested.md --><br/><Badge type="info" text="⚡️ readonly reactive" />        |
| `isAccessGranted`     | <!--@include: @/generated/LocationManager-isAccessGranted.md --><br/><Badge type="info" text="⚡️ readonly reactive" />          |
| `init`                | <!--@include: @/generated/LocationManager-init.md --><br/><Badge type="info" text="⭐️ async" />                                 |
| `onManagerUpdate`     | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onLocationManagerUpdated</code>. |
| `getLocation`         | <!--@include: @/generated/LocationManager-getLocation.md --><br/><Badge type="info" text="⭐️ async" />                          |
| `onRequest`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onLocationRequested</code>.      |
| `openSettings`        | <!--@include: @/generated/LocationManager-openSettings.md -->                                                                  |
| `version`             | <!--@include: @/generated/WebApp-version.md -->                                                                                |
| `isVersionAtLeast`    | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                       |
